import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { MainService } from '../../../core/services/main.service';
import {ParseToXmlService} from '../../../core/services/parse-to-xml.service';
import {EmployeeModel, ProjectModel, TaskModel} from '../../../core/models/report.model';
import { SPECIALTASKS } from '../../../core/models/special-tasks-data';
import {FileModel} from './file.model';

@Component({
  selector: 'app-new-report-modal',
  templateUrl: './new-report-modal.component.html',
  styleUrls: ['./new-report-modal.component.scss'],
  providers: []
})
export class NewReportModalComponent implements OnInit {

  @Input() folderPath: string;
  @Output() closeModal = new EventEmitter<boolean>();

  public filesList: FileModel[] = [];
  public yearsList = [];

  public selectedYear = moment().year();
  public currentWeek = moment().isoWeek();

  public fileName;

  constructor(private mainService: MainService,
              private parseToXmlService: ParseToXmlService) { }

  ngOnInit() {
    this.getYearsList();
    this.getWeeksList(this.selectedYear);
  }

  getYearsList() {
    const currentYear = moment().year();
    const nextYear = currentYear + 1;
    for (let i = 2006; i <= nextYear; i++) {
      this.yearsList.push(i);
    }
  }

  getWeeksList(year) {
    const selectedDate = moment().set('year', year);
    const weeks = moment(selectedDate).isoWeeksInYear();

    let firstDay = moment(selectedDate).startOf('year');

    for (let i = 0; i < weeks; i++) {
      const file = new FileModel();
      file.numberOfWeek = i + 1;
      file.startWeek = moment(firstDay).startOf('isoWeek').format('DD.MM.YYYY');
      file.endWeek = moment(firstDay).endOf('isoWeek').format('DD.MM.YYYY');
      file.nameListItem = file.numberOfWeek + ': ' + file.startWeek + ' - ' + file.endWeek;
      if (file.numberOfWeek < 10) {
        file.fileName = '0' + file.numberOfWeek + '_' + file.startWeek + '-' + file.endWeek + '.xls';
      } else {
        file.fileName = file.numberOfWeek + '_' + file.startWeek + '-' + file.endWeek + '.xls';
      }

      if (this.currentWeek === file.numberOfWeek) {
        this.fileName = file.fileName;
      }
      this.filesList.push(file);
      firstDay = firstDay.add(1, 'week');
    }
  }

  changeYear() {
    this.filesList = [];
    this.getWeeksList(this.selectedYear);
  }

  chooseFile(fileName) {
    this.fileName = fileName;
  }

  clickClose() {
    this.close();
  }

  createReport() {
    if (localStorage.getItem('files').includes(this.fileName)) {
      const isOverwrite = confirm('Отчёт с таким именем уже существует. Перезаписать отчёт?');
      if (isOverwrite) {
        const emptyReport = this.getFirstEmployee();
        const emptyReportXml = this.parseToXmlService.parseToXml(emptyReport);
        this.mainService.saveFile(this.folderPath + '\\' + this.fileName, emptyReportXml).then(result => {
          const files = JSON.parse(localStorage.getItem('files'));
          const index = files.indexOf(this.fileName);
          files.splice(index, 1);
          files.push(this.fileName);
          localStorage.setItem('files', JSON.stringify(files));
          localStorage.setItem('selectedFile', this.fileName);
          this.mainService.newReportAlert();
          this.close();
        });
      }
    } else {
      const emptyReport = this.getFirstEmployee();
      const emptyReportXml = this.parseToXmlService.parseToXml(emptyReport);
      this.mainService.saveFile(this.folderPath + '\\' + this.fileName, emptyReportXml).then(result => {
        const files = JSON.parse(localStorage.getItem('files'));
        files.push(this.fileName);
        localStorage.setItem('files', JSON.stringify(files));
        localStorage.setItem('selectedFile', this.fileName);
        this.clickClose();
      });
    }
  }

  getFirstEmployee() {
    const obj = {
      commonForm: [],
      specialForm: [{
        employeeName: '',
        rate: 0,
        specialTasks: SPECIALTASKS
      }]
    };
    obj.commonForm.push(new ProjectModel());
    obj.commonForm[0].employee.push(new EmployeeModel());
    obj.commonForm[0].employee[0].tasks.push(new TaskModel());
    return obj;
  }

  private close() {
    this.closeModal.emit(false);
  }

}
