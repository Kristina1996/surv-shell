import { Component, OnInit, Input } from '@angular/core';
import * as fs from 'fs';

import { HomeService } from '../../../core/services/home.service';
import { AdapterService } from '../../../core/services/adapter.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ HomeService, AdapterService ]
})
export class ReportComponent implements OnInit {

  @Input() filePath: string;
  public fileContent;

  constructor(private homeService: HomeService,
              private adapterService: AdapterService) { }

  ngOnInit() {
    this.homeService.getFileContent(this.filePath).then(result => {
      /*
      this.adapterService.getModel(result).subscribe(result => {
        console.log('вернулся из адаптера')
      }, error => console.log(error));
      */
      let a = this.adapterService.getModel(result);

       this.fileContent = result;
       if(this.fileContent.length == 0) alert('Файл пустой.')
    });
  }

}
