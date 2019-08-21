import { Component, OnInit } from '@angular/core';
import { EMPLOYEE } from '../core/models/mock-data';
import { PROJECTS } from '../core/models/mock-data';
import { REPORTS } from '../core/models/mock-data';
import { TASKS } from '../core/models/mock-data';
import { SPECIALITEMS } from '../core/models/mock-data';

const electron = require('electron')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  reports = REPORTS;

  public filePath;

  constructor() { }

  ngOnInit() {
    console.log(this.reports);

    console.log(electron.remote.dialog)
    console.log(electron.remote.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }).then(result => {
      console.log(result.filePaths)
      }).catch(err => {
        console.log(err)
      }))
  }

  fileChange(event) {
    console.log(event.target.value);
    this.filePath = event.target.path;
    localStorage.setItem('filePath', this.filePath);
}

}
