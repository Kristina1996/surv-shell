import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';
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
  isShowContextMenu = false;
  contextMenuPosition;

  constructor(private holderStorageService: HolderStorageService,
              private cdr: ChangeDetectorRef) {
  }

  /**
   * Отслеживание события click левой кнопкой мыши, чтобы скрыть context menu
   */
  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {
    this.isShowContextMenu = false;
    this.contextMenuPosition = undefined;
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

  showContextMenu(event, file) {
    this.isShowContextMenu = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
  }

}
