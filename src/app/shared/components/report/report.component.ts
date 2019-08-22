import { Component, OnInit, Input } from '@angular/core';
import * as fs from 'fs';

import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ HomeService ]
})
export class ReportComponent implements OnInit {

  @Input() filePath: string;
  public fileContent;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getFileContent(this.filePath).then(result => {
      //(result.length > 0) ? this.files = result : alert('Файлы не найдены! Пожалуйста, выберите другую папку.')
       this.fileContent = result;
       console.log('получили содержимое файла с сервиса: ' + this.fileContent)
       if(this.fileContent.length == 0) alert('Файл пустой.')
    });
  }

}
