import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as fs from 'fs';

import { HomeService } from '../../../core/services/home.service';
import { AdapterService } from '../../../core/services/adapter.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ HomeService, AdapterService ]
})
export class ReportComponent implements OnInit, OnChanges {

  @Input() filePath: string;
  public fileContent;

  constructor(private homeService: HomeService,
              private adapterService: AdapterService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.filePath = changes.filePath.currentValue
    this.homeService.getFileContent(this.filePath).then(result => {
      console.log(result)
      let a = this.adapterService.getModel(result);

      this.fileContent = result;
      if(this.fileContent.length == 0) alert('Файл пустой.')
    });
  }

}
