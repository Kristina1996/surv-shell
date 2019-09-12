import { Component, OnInit, EventEmitter } from '@angular/core';
import * as fs from 'fs';

import { HomeService } from '../core/services/home.service';

const electron = require('electron')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ HomeService ]
})
export class HomeComponent implements OnInit {

  public showFilesMenuComponent: Boolean = false;
  public showReportComponent: Boolean = false;
  public showModalNewReport: Boolean = false;

  public folderPath;
  public files;
  public selectedFile;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    const folderPath = localStorage.getItem('folderPath');
    const files = localStorage.getItem('files');
    const fileName = localStorage.getItem('fileName');

    if (folderPath) {
      this.folderPath = folderPath;
    }
    if (files) {
      this.showFilesMenuComponent = true;
      this.files = JSON.parse(files);
    }
    if (fileName) {
      this.selectedFile = this.folderPath + '\\' + fileName;
      this.showReportComponent = true;
    }
  }

  openDialog() {
    electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
      this.folderPath = result.filePaths[0];
      this.showReportComponent = false;
      localStorage.setItem('files', '');
      localStorage.setItem('fileName', '');

      if (this.folderPath) {
        localStorage.setItem('folderPath', result.filePaths[0]);
        this.getFilesFromFolder();
      }
    }).catch(err => {
      console.log(err);
    });
  }

  getFilesFromFolder() {
    this.homeService.getFilesFromFolder(this.folderPath).then(result => {
      this.files = result;
      if (this.files.length === 0) {
         alert('Файлы не найдены! Пожалуйста, выберите другую папку.');
         this.showFilesMenuComponent = false;
         this.showReportComponent = false;
      } else {
         this.showFilesMenuComponent = true;
         localStorage.setItem('files', JSON.stringify(this.files));
      }
    });
  }

  /**
   *Метод для получения имени выбранного файла от компонента FilesMenuComponent
  **/
  onSendFileName(fileName: string) {
    localStorage.setItem('fileName', fileName)
    this.selectedFile = this.folderPath + '\\' + fileName;
    this.showReportComponent = true;
  }

  /*
  openModalNewReport() {
    this.showModalNewReport = true;
  }
   */

  onShowModalNewReport(click: Boolean) {
    if (click) { this.showModalNewReport = true; }
  }

  /**
   *Метод для закрытия модального окна Create New Report
  **/
  onCloseModal(show: Boolean) {
    if (show === false) { this.showModalNewReport = false; }
    this.files = JSON.parse(localStorage.getItem('files'));
  }
}
