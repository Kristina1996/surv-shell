import { Component, OnInit } from '@angular/core';
import * as fs from 'fs';

import { EMPLOYEE } from '../core/models/mock-data';
import { PROJECTS } from '../core/models/mock-data';
import { REPORTS } from '../core/models/mock-data';
import { TASKS } from '../core/models/mock-data';
import { SPECIALITEMS } from '../core/models/mock-data';

import { HomeService } from '../core/services/home.service';

const electron = require('electron')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ HomeService ]
})
export class HomeComponent implements OnInit {

  reports = REPORTS;
  public folderPath;
  public files;
  public isFolderChecked: Boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    console.log(this.reports);
  }

  openDialog() {
    console.log(electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
      this.folderPath = result.filePaths[0];
      this.isFolderChecked = false;
      localStorage.setItem('folderPath', result.filePaths[0]);
    }).catch(err => {
      console.log(err)
    }))
  }

  getFilesFromFolder() {
    this.homeService.getFilesFromFolder(this.folderPath).then(result => {
      (result.length > 0) ? this.files = result : alert('Файлы не найдены! Пожалуйста, выберите другую папку.')
    });
    this.isFolderChecked = true;
  }

}
