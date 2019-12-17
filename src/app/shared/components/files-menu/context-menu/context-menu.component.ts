import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input() contextMenuPosition;
  @Output() clickUploadReport = new EventEmitter<string>();
  @Output() clickMarkAsUploaded = new EventEmitter<string>();
  @Output() clickDeleteReport = new EventEmitter<string>();

  items = [
    { title: 'Загрузить отчёт в СУРВ', onClick: this.uploadReport.bind(this) },
    { title: 'Пометить отчёт как загруженный', onClick: this.markAsUploaded.bind(this) },
    { title: 'Удалить отчёт с диска', onClick:  this.deleteReport.bind(this) }
  ];

  constructor() { }

  ngOnInit() {}

  uploadReport() {
    this.clickUploadReport.emit('');
  }

  markAsUploaded() {
    this.clickMarkAsUploaded.emit('');
  }

  deleteReport() {
    this.clickDeleteReport.emit('');
  }

}
