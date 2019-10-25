import { Component, OnInit, EventEmitter } from '@angular/core';
import * as fs from 'fs';

import { MainService } from '../core/services/main.service';
import * as path from 'path';

const electron = require('electron')

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ MainService ]
})
export class MainComponent implements OnInit {

  public showFilesMenuComponent: Boolean = false;
  public showReportComponent: Boolean = false;
  public showModalNewReport: Boolean = false;

  public folderPath;
  public files;
  public selectedFile;
  public selectedFileName;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    const folderPath = localStorage.getItem('folderPath');
    const files = localStorage.getItem('files');
    const selectedFile = localStorage.getItem('selectedFile');

    if (folderPath) {
      this.folderPath = folderPath;
    }
    if (files) {
      this.showFilesMenuComponent = true;
      this.files = JSON.parse(files);
    }
    if (selectedFile) {
      this.selectedFile = path.join(this.folderPath, selectedFile);
      this.showReportComponent = true;
    }
  }

  openDialog() {
    electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
      this.folderPath = result.filePaths[0];
      this.showReportComponent = false;
      localStorage.setItem('files', '');
      localStorage.setItem('selectedFile', '');

      if (this.folderPath) {
        localStorage.setItem('folderPath', result.filePaths[0]);
        this.getFilesFromFolder();
      } else { this.showFilesMenuComponent = false; }
    }).catch(err => {
      console.log(err);
    });
  }

  getFilesFromFolder() {
    this.mainService.getFilesFromFolder(this.folderPath).then(result => {
      this.files = result;
      if (this.files.length === 0) {
         this.showFilesMenuComponent = true;
         this.showReportComponent = false;
        localStorage.setItem('files', JSON.stringify(this.files));
      } else {
         this.showFilesMenuComponent = true;
         localStorage.setItem('files', JSON.stringify(this.files));
      }
    });
  }

  /**
   *Метод для получения имени выбранного файла от компонента FilesMenuComponent
  **/
  onSendFileName(selectedFile: string) {
    localStorage.setItem('selectedFile', selectedFile)
    this.selectedFile = path.join(this.folderPath, selectedFile);
    this.showReportComponent = true;
  }

  onShowModalNewReport(click: Boolean) {
    if (click) { this.showModalNewReport = true; }
  }

  /**
   *Метод для закрытия модального окна Create New Report
  **/
  onCloseModal(show: Boolean) {
    if (show === false) { this.showModalNewReport = false; }
    this.files = JSON.parse(localStorage.getItem('files'));
    this.selectedFile = path.join(this.folderPath, localStorage.getItem('selectedFile'));
    this.selectedFileName = localStorage.getItem('selectedFile');
    this.showReportComponent = true;
  }
}
