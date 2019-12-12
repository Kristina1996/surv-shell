import { Component, OnInit, EventEmitter } from '@angular/core';
import * as path from 'path';
import { MainService } from '../core/services/main.service';
import { TimeTrackerWebService } from '../core/services/time-tracker-web.service';
import {PasswordEncoderService} from '../core/services/password-encoder.service';
import { AdapterService } from '../core/services/adapter.service';

const electron = require('electron');

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
  public showSettingsModal: Boolean = false;

  public folderPath;
  public files;
  public selectedFile;
  public selectedFileName;

  constructor(private mainService: MainService,
              private timeTrackerWebService: TimeTrackerWebService,
              private passwordEncoderService: PasswordEncoderService,
              private adapterService: AdapterService) { }

  ngOnInit() {
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage() {
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
    this.checkUserInfo();
  }

  checkUserInfo() {
    if (localStorage.getItem('userInfo')) {
      this.updateDataFromBack();
    }
  }

  updateDataFromBack() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const password = this.passwordEncoderService.decryptPassword(userInfo.password);
    userInfo.password = password;

    this.timeTrackerWebService.getProjectsAndUsers({...userInfo}).subscribe(([projects, users]) => {
      localStorage.setItem('users', JSON.stringify(this.adapterService.getUsersXmlModel(users)));
      localStorage.setItem('projects', JSON.stringify(this.adapterService.getProjectsXmlModel(projects)));
    });
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
    this.mainService.getFilesFromFolder(this.folderPath).then((result: string[]) => {
      this.files = [];
      result.forEach(file => {
        this.files.push({ name: file, isSaved: false });
      });
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
    localStorage.setItem('selectedFile', selectedFile);
    this.selectedFile = path.join(this.folderPath, selectedFile);
    this.showReportComponent = true;
  }

  onShowModalNewReport(click: Boolean) {
    if (click) { this.showModalNewReport = true; }
  }

  openSettingsModal() {
    this.showSettingsModal = true;
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

  onCloseSettingsModal(show: Boolean) {
    this.showSettingsModal = show;
  }
}
