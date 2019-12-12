import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import {forkJoin, Observable, of, Subject} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerWebService {

  soap;

  constructor(private electronService: ElectronService) {
    this.soap = this.electronService.soap;
  }

  getProjectsAndUsers(userInfo) {
    return this.createClient(userInfo).pipe(
      mergeMap(client => {
        return forkJoin([this.getProjects(client), this.getUsers(client)]);
      })
    );
  }

  getProjects(client) {
    return new Observable(observer => {
      client.GetProjects(null, (error, response) => {
        if (error) {
          observer.error(error);
          console.error(error);
        } else {
          observer.next(response.GetProjectsResult.ProjectDto);
          observer.complete();
        }
      });
    });
  }

  getUsers(client) {
    return new Observable(observer => {
      client.GetUsers(null, (error, response) => {
        if (error) {
          observer.error(error);
          console.error(error);
        } else {
          observer.next(response.GetUsersResult.UserDto);
          observer.complete();
        }
      });
    });
  }

  uploadReport(userInfo, report) {
    return this.createClient(userInfo).pipe(
      mergeMap(client => {
        return this.uploadManagerReport(client, report).pipe(
          mergeMap(response => {
            return (response.UploadManagerReportResult.ResultCode === 'DataError' && response.UploadManagerReportResult.Message.startsWith('Дублируется'))
              ? this.deleteReport(client).pipe(
                mergeMap(deleteResponse => this.uploadManagerReport(client, report))
              )
              : of(response);
          }));
      })
    );
  }

  uploadManagerReport(client, report): Observable<any> {
    const date = this.getReportingDate();
    const body = this.getRequestBodyUploadReport(date, report);
    return new Observable(observer => {
      client.UploadManagerReport(body, (error, response, rawResponse, soapHeader, rawRequest) => {
        if (error) {
          observer.error(error);
          console.error(error);
        } else {
          if (response.UploadManagerReportResult.ResultCode === 'Success') {
            this.changeFileStatus(true);
          }
          console.log(response);
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  deleteReport(client) {
    const date = this.getReportingDate();
    const body = this.getRequestBodyDeleteReport(date);
    return new Observable(observer => {
      client.DeleteManagerReport(body, (error, response) => {
        if (error) {
          observer.error(error);
          console.error(error);
        } else {
          this.changeFileStatus(false);
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  changeFileStatus(isSaved: boolean) {
    const files = JSON.parse(localStorage.getItem('files'));
    const updatedFiles = files.map(file => {
      if (file.name === localStorage.getItem('selectedFile')) {
        console.log('filename == selected', file.name);
        file.isSaved = isSaved;
      }
      return file;
    });
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  }

  getReportingDate() {
    const fileName = localStorage.getItem('selectedFile');
    const dateFromTitle = fileName.substr(3, 10);
    return moment(dateFromTitle, 'DD.MM.YYYY').format('YYYY-MM-DD');
  }

  private createClient(userInfo): Observable<any> {
    return new Observable( observer => {
      const security = new this.soap.NTLMSecurity(userInfo);
      this.soap.createClient('http://' + userInfo.host + '/timetrackertest/TimeTrackerWebService.asmx?WSDL', {wsdl_options: {...userInfo}},  (err, client) => {
        if (err) {
          observer.error(err);
          console.error(err);
        } else {
          client.setSecurity(security);
          observer.next(client);
        }
      });
    });
  }

  private getRequestBodyUploadReport = (reportingDate, report) => ({
    reportingDate: reportingDate,
    reportXmlstring: report
  })

  private getRequestBodyDeleteReport = (reportingDate) => ({
    reportingDate: reportingDate
  })
}
