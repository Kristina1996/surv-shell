import { Component, OnInit } from '@angular/core';
const electron = require('electron')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public filePath;

  constructor() { }

  ngOnInit() {
    //const { dialog } = require('electron')
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
