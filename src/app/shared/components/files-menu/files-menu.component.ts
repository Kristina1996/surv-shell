import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-files-menu',
  templateUrl: './files-menu.component.html',
  styleUrls: ['./files-menu.component.scss']
})
export class FilesMenuComponent implements OnInit {

   @Input() files: string[];
   @Output() sendFileName = new EventEmitter<string>();
   @Output() openModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  /**
   * Передача компоненту-родителю Main имя выбранного файла
  **/
  chooseFile(fileName) {
    console.log('передаю компоненту родителю имя выбранного файла')
    this.sendFileName.emit(fileName);
  }

  openModalNewReport() {
    this.openModal.emit(true);
  }


}
