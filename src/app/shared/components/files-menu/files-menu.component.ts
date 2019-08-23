import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-files-menu',
  templateUrl: './files-menu.component.html',
  styleUrls: ['./files-menu.component.scss']
})
export class FilesMenuComponent implements OnInit {

   @Input() files: string[];
   @Output() sendFileName = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Передача компоненту-родителю Home имя выбранного файла
  **/
  chooseFile(fileName) {
    console.log('передаю компоненту родителю имя выбранного файла')
    this.sendFileName.emit(fileName);
  }

}
