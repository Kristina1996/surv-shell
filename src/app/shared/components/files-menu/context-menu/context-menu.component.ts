import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input() contextMenuPosition;
  items = [
    { title: 'Загрузить отчёт в СУРВ', onClick: this.uploadReport },
    { title: 'Пометить отчёт как загруженный', onClick: this.markAsUploaded },
    { title: 'Удалить отчёт с диска', onClick:  this.deleteReport }
  ];

  constructor() { }

  ngOnInit() {}

  uploadReport() {}

  markAsUploaded() {}

  deleteReport() {}

}
