import {ChangeDetectorRef, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ElectronService} from './electron/electron.service';
import * as moment from 'moment';
import {getFirstReport, getSpecialTasks} from '../../shared/components/new-report-modal/report-adapter';
import {EmployeeModel, ProjectModel, ReportModel, TaskModel} from '../models/report.model';
import {ParseToXmlService} from './parse-to-xml.service';
import * as path from "path";
import {MainService} from './main.service';
import {FormServiceService} from './form-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TogglIntegrationService {

  public workspaces;
  public updateTogglReport = new BehaviorSubject(0);

  private userUrl = 'https://www.toggl.com/api/v8/me';

  constructor(private _http: HttpClient,
              private parseToXmlService: ParseToXmlService,
              private formServiceService: FormServiceService,
              private mainService: MainService,
              private electronService: ElectronService) { }

  getUserData(username, password) {
    const options = {
      hostname: 'www.toggl.com',
      path: '/api/v8/me',
      method: 'GET',
      auth: username + ':' + password,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    this.electronService.https.get(options, (res, ) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
        const jsResponse = JSON.parse(rawData);
        if (res.statusCode === 200) {
          if (jsResponse.data.api_token) {
            this.workspaces = jsResponse.data.workspaces;
            // tslint:disable-next-line:max-line-length
            localStorage.setItem('toggl', JSON.stringify({username: username, api_token: jsResponse.data.api_token, workspaces: jsResponse.data.workspaces}));
          }
        }
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          const selectedFile = localStorage.getItem('selectedFile');
          if (selectedFile) {
            this.getWeekReport(selectedFile);
          }
        }
      });
    });
  }

  getWeekReport(selectedFile) {
    const since = selectedFile.slice(3, 13);
    const until = selectedFile.slice(14, 24);
    const sinceDate = moment(since, 'DD.mm.YYYY').format('YYYY-mm-DD');
    const untilDate = moment(until, 'DD.mm.YYYY').format('YYYY-mm-DD');
    const username = JSON.parse(localStorage.getItem('toggl')).username;
    const token = JSON.parse(localStorage.getItem('toggl')).api_token;

    if (!this.workspaces) { this.workspaces = JSON.parse(localStorage.getItem('toggl')).workspaces; }
    const options = {
      hostname: 'www.toggl.com',
      // tslint:disable-next-line:max-line-length
      url: 'https://www.toggl.com/reports/api/v2/details?user_agent=' + username + '&workspace_id=' + this.workspaces[0].id + '&since=' + sinceDate + '&until=' + untilDate,
      method: 'GET',
      json: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(token + ':api_token')}`
      }
    };

    this.electronService.request.get(options, (error, responseServer, body) => {
      if (!error) {
        const report = this.getReportModel(body.data);
        const reportXml = this.parseToXmlService.parseToXml(report);
        const folderPath = localStorage.getItem('folderPath');
        const fileName = localStorage.getItem('selectedFile');
        this.mainService.saveFile(path.join(folderPath, fileName), reportXml).then(result => {
          this.updateTogglReport.next(1);
        });
      }
    });
  }

  getReportModel(data) {
    const emptyReportModel = getFirstReport();
    const report = new ReportModel();
    data.forEach(item => {
      const indexProject = report.common.findIndex(element => element.name.includes(item.project));
      let project;
      (indexProject !== -1) ? project = report.common[indexProject] : project = new ProjectModel();
      project.name = item.project;
      const indexEmployee = project.employee.findIndex(element => element.name.includes(item.user));
      let employee;
      (indexEmployee !== -1) ? employee = project.employee[indexEmployee] : employee = new EmployeeModel();
      employee.name = item.user;
      const task = new TaskModel();
      task.name = item.task;
      task.hours = Number(moment.duration(item.dur, 'milliseconds').asHours().toFixed(2));

      employee.tasks.push(task);
      if (indexEmployee === -1) { project.employee.push(employee); }
      if (indexProject === -1) { report.common.push(project); }
    });
    report.specialTasks = getSpecialTasks();
    return report;
  }
}
