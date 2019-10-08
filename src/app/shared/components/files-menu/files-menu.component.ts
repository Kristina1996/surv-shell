import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-files-menu',
  templateUrl: './files-menu.component.html',
  styleUrls: ['./files-menu.component.scss']
})
export class FilesMenuComponent implements OnInit, OnChanges {

   @Input() files: string[];
   @Input() selectedFile;
   @Output() sendFileName = new EventEmitter<string>();
   @Output() openModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    const file = localStorage.getItem('selectedFile');
    if (file) { this.selectedFile = file; }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.files = changes.files.currentValue;
    this.files.sort((a, b) => {
      return Number(b.substr(0, 2)) - Number(a.substr(0, 2));
    });
  }

  /**
   * Передача компоненту-родителю Main имя выбранного файла
  **/
  chooseFile(fileName) {
    this.selectedFile = fileName;
    console.log('передаю компоненту родителю имя выбранного файла')
    this.sendFileName.emit(fileName);
  }

  openModalNewReport() {
    this.openModal.emit(true);
  }


}
