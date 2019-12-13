import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {HolderStorageService} from '../../../core/services/holder-storage-service';

@Component({
  selector: 'app-files-menu',
  templateUrl: './files-menu.component.html',
  styleUrls: ['./files-menu.component.scss']
})
export class FilesMenuComponent implements OnInit, OnChanges {

  @Input() files;
  @Input() selectedFile;
  @Output() sendFileName = new EventEmitter<string>();
  @Output() openModal = new EventEmitter<boolean>();
  uploadedReports = [];

  constructor(private holderStorageService: HolderStorageService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    const file = localStorage.getItem('selectedFile');
    if (file) {
      this.selectedFile = file;
    }
    this.holderStorageService.updateLocalStorage.subscribe(value => {
      const updatedReports = JSON.parse(localStorage.getItem('uploadedReports'));
      if (updatedReports) {
        this.uploadedReports = updatedReports;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.files = changes.files.currentValue;
    this.files.sort((a, b) => {
      return Number(b.substr(0, 2)) - Number(a.substr(0, 2));
    });
    const file = localStorage.getItem('selectedFile');
    if (file) {
      this.selectedFile = file;
    }
  }

  /**
   * Передача компоненту-родителю Main имя выбранного файла
   **/
  onChooseFile(fileName) {
    this.selectedFile = fileName;
    this.sendFileName.emit(fileName);
  }

  openModalNewReport() {
    this.openModal.emit(true);
  }


}
