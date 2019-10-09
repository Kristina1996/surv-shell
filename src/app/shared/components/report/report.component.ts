import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as fs from 'fs';

import { ReportModel } from '../../../core/models/report.model';

import { MainService } from '../../../core/services/main.service';
import { AdapterService } from '../../../core/services/adapter.service';
import { FormServiceService } from '../../../core/services/form-service.service';
import { ParseToXmlService } from '../../../core/services/parse-to-xml.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ MainService, AdapterService, FormServiceService ]
})
export class ReportComponent implements OnInit, OnChanges {

  @Input() filePath: string;
  report: ReportModel;

  constructor(private mainService: MainService,
              private adapterService: AdapterService,
              private formService: FormServiceService,
              private parseToXmlService: ParseToXmlService) { }

  ngOnInit() {
    // this.getReportContent();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filePath = changes.filePath.currentValue;
    console.log(this.filePath);
    this.mainService.getFileContent(this.filePath).then(result => {
      console.log('Содержимое выбранного отчета: ' + JSON.stringify(result));
      if (result) {
        this.report = this.adapterService.getModel(result);
        console.log(this.report);
      } else {
          this.report = new ReportModel();
      }
    });
  }

  getReportContent() {
    this.mainService.getFileContent(this.filePath).then(result => {
      console.log('Содержимое выбранного отчета: ' + JSON.stringify(result));
      if (result) {
        this.report = this.adapterService.getModel(result);
        console.log(this.report);
      } else {
        this.report = new ReportModel();
      }
    });
  }
}
