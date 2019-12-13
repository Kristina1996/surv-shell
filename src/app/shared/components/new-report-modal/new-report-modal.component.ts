import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { MainService } from '../../../core/services/main.service';
import { ParseToXmlService } from '../../../core/services/parse-to-xml.service';
import { AdapterService } from '../../../core/services/adapter.service';

import { TaskModel } from '../../../core/models/report.model';
import { FileModel } from './file.model';
import { getYearsList, getWeeksList } from './date-util';
import { getFirstReport } from './report-adapter';
import * as path from 'path';

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

  config = {
    title: 'Создание нового отчета',
    cancel: {
      title: 'Закрыть',
      visible: true
    },
    save: {
      title: 'Сохранить',
      visible: true
    }
  };

  constructor(private mainService: MainService,
              private parseToXmlService: ParseToXmlService,
              private adapterService: AdapterService) { }

  ngOnInit() {
    this.yearsList = getYearsList();
    const res = getWeeksList(this.selectedYear);
    this.fileName = res.currentFileName;
    this.filesList = res.filesList;
  }

  changeYear() {
    this.filesList = [];
    const res = getWeeksList(this.selectedYear);
    this.fileName = res.currentFileName;
    this.filesList = res.filesList;
  }

  chooseFile(fileName) {
    this.fileName = fileName;
  }

  onCloseModal() {
    this.close();
  }

  createReport() {
    if (localStorage.getItem('files').includes(this.fileName)) {
      const isOverwrite = confirm('Отчёт с таким именем уже существует. Перезаписать отчёт?');
      if (isOverwrite) {
        this.isExistLastReport(isOverwrite);
        this.mainService.newReportAlert();
      }
    } else { this.isExistLastReport(false); }
  }

  isExistLastReport(isOverwrite) {
    const currentIndex = this.filesList.findIndex(element => element.fileName === this.fileName);
    const lastReportName = this.filesList[currentIndex - 1].fileName;
    this.mainService.isExistReport(path.join(this.folderPath, lastReportName)).then(result => {
      this.getDataFromLastReport(lastReportName, isOverwrite);
    }, error => {
      const emptyReportModel = getFirstReport();
      this.saveReport(emptyReportModel, isOverwrite);
    });
  }

  getDataFromLastReport(lastReportName, isOverwrite) {
    this.mainService.getFileContent(path.join(this.folderPath, lastReportName)).then(result => {
      const report = this.adapterService.getModel(result);
      report.common.map(project => {
        project.employee.map(empl =>  {
          empl.tasks.splice(0, empl.tasks.length);
          empl.tasks.push(new TaskModel());
        });
      });
      report.specialTasks.map(specialItem => {
        specialItem.specialTasks.map(task => {
          task.name = '';
          task.hours = 0;
          task.comment = '';
        });
      });
      this.saveReport(report, isOverwrite);
    });
  }

  saveReport(report, isOverwrite) {
    const reportXml = this.parseToXmlService.parseToXml(report);
    this.mainService.saveFile(path.join(this.folderPath, this.fileName), reportXml).then(result => {
      const files = JSON.parse(localStorage.getItem('files'));
      if (isOverwrite) { files.splice(files.indexOf(this.fileName), 1); }
      files.push({name: this.fileName, isSaved: false});
      localStorage.setItem('files', JSON.stringify(files));
      localStorage.setItem('selectedFile', this.fileName);
      this.onCloseModal();
    });
  }

  private close() {
    this.closeModal.emit(false);
  }

}
