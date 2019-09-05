import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as fs from 'fs';

import { ReportModel } from '../../../core/models/report.model';

import { HomeService } from '../../../core/services/home.service';
import { AdapterService } from '../../../core/services/adapter.service';
import { FormServiceService } from '../../../core/services/form-service.service';
import { ParseToXmlService } from '../../../core/services/parse-to-xml.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ HomeService, AdapterService, FormServiceService ]
})
export class ReportComponent implements OnInit, OnChanges {

  @Input() filePath: string;
  report: ReportModel;

  constructor(private homeService: HomeService,
              private adapterService: AdapterService,
              private formService: FormServiceService,
              private parseToXmlService: ParseToXmlService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.filePath = changes.filePath.currentValue;
    console.log(this.filePath);
    this.homeService.getFileContent(this.filePath).then(result => {
      console.log('Содержимое выбранного отчета: ' + result);
      if (result) {
        this.report = this.adapterService.getModel(result);
        console.log(this.report);
      } else {
          this.report = new ReportModel();
      }
    });
  }

  saveReport() {
    const formValue = this.formService.getForm().getRawValue();
    console.log(formValue);
    console.log(this.filePath);
    const content = this.parseToXmlService.parseToXml(formValue);
    this.homeService.saveFile(this.filePath, content);
  }

}
