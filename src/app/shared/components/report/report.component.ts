import {Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { ReportModel } from '../../../core/models/report.model';

import { MainService } from '../../../core/services/main.service';
import { AdapterService } from '../../../core/services/adapter.service';
import { FormServiceService } from '../../../core/services/form-service.service';

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
  projectsFromService;
  commonTotalHours = 0;
  specialTotalHours = 0;
  totalHours = 0;

  constructor(private mainService: MainService,
              private adapterService: AdapterService) {
    this.subscription = this.mainService.data.subscribe(val => {
      if (val === 1) { this.getReportContent(); }
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.filePath = changes.filePath.currentValue;
    this.getReportContent();
  }

  onCommonTotalHoursChange(hours) {
    this.commonTotalHours = hours;
    this.totalHours = this.commonTotalHours + this.specialTotalHours;
  }

  onSpecialTotalHoursChange(hours) {
    this.specialTotalHours = hours;
    this.totalHours = this.commonTotalHours + this.specialTotalHours;
  }

  getReportContent() {
    this.mainService.getFileContent(this.filePath).then(result => {
      if (result) {
        this.report = this.adapterService.getModel(result);
      } else { this.report = new ReportModel(); }
    }, error => {
      alert('Отчёт содержит некорректную структуру. Попробуйте открыть другой отчёт.\n\n' + error);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
