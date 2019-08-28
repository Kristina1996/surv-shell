import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-new-report-modal',
  templateUrl: './new-report-modal.component.html',
  styleUrls: ['./new-report-modal.component.scss'],
  providers: [HomeService]
})
export class NewReportModalComponent implements OnInit {

  @Input() folderPath: string;
  @Output() closeModal = new EventEmitter<boolean>();

  public fileName;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  clickClose() {
    this.closeModal.emit(false);
  }

  createReport() {
    this.homeService.createFile(this.folderPath, this.fileName).then(result => {
      alert('Файл ' + result + ' был успешно создан')
      let files = JSON.parse(localStorage.getItem('files'));
      files.push(this.fileName);
      localStorage.setItem('files', JSON.stringify(files));
    });
  }

}
