import {Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy} from '@angular/core';

import { ReportModel } from '../../../core/models/report.model';

import { MainService } from '../../../core/services/main.service';
import { AdapterService } from '../../../core/services/adapter.service';
import { FormServiceService } from '../../../core/services/form-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ AdapterService, FormServiceService ]
})
export class ReportComponent implements OnInit, OnChanges, OnDestroy {

  @Input() filePath: string;
  report: ReportModel;
  subscription: Subscription;

  constructor(private mainService: MainService,
              private adapterService: AdapterService) {
    this.subscription = this.mainService.data.subscribe(val => {
      if (val === 1) { this.getReportContent(); }
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filePath = changes.filePath.currentValue;
    this.getReportContent();
  }

  getReportContent() {
    this.mainService.getFileContent(this.filePath).then(result => {
      console.log('Содержимое выбранного отчета: ' + JSON.stringify(result));
      if (result) {
        this.report = this.adapterService.getModel(result);
        console.log(this.report);
      } else { this.report = new ReportModel(); }
    }, error => {
      alert('Отчёт содержит некорректную структуру. Попробуйте открыть другой отчёт.');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
