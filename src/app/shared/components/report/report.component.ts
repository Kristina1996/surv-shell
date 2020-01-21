import {Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs';

import { IntegrationResultModel, ReportModel } from '../../../core/models/report.model';

import { MainService } from '../../../core/services/main.service';
import { AdapterService } from '../../../core/services/adapter.service';
import { FormServiceService } from '../../../core/services/form-service.service';
import { TimeTrackerWebService } from '../../../core/services/time-tracker-web.service';
import { ParseToXmlService } from '../../../core/services/parse-to-xml.service';
import { PasswordEncoderService } from '../../../core/services/password-encoder.service';
import {TogglIntegrationService} from '../../../core/services/toggl-integration.service';

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
  commonTotalHours = 0;
  specialTotalHours = 0;
  totalHours = 0;
  integrationResult: IntegrationResultModel|boolean;
  isShowErrorReportModal = false;
  isShowTogglIcon = false;

  constructor(private mainService: MainService,
              private timeTrackerWebService: TimeTrackerWebService,
              private parseToXmlService: ParseToXmlService,
              private formService: FormServiceService,
              private togglIntegrationService: TogglIntegrationService,
              private passwordEncoderService: PasswordEncoderService,
              private adapterService: AdapterService,
              private cdr: ChangeDetectorRef) {
    this.subscription = this.mainService.data.subscribe(val => {
      if (val === 1) { this.getReportContent(); }
    });
  }

  ngOnInit() {
    this.togglIntegrationService.updateTogglReport.subscribe(value => {
      // Пришел отчет с toggl.com
      if (value === 1) {
        this.getReportContent();
      } else if (value === 2) {
        this.isShowTogglIcon = true;
        this.cdr.detectChanges();
      }
    });
  }

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
      (result) ? this.report = this.adapterService.getModel(result) : this.report = new ReportModel();
      this.cdr.detectChanges();
    }, error => {
      if (error.message.includes('no such file or directory')) {
        alert('Отчёт был удалён с компьютера');
      } else {
        alert('Отчёт содержит некорректную структуру. Попробуйте открыть другой отчёт.\n\n' + error);
      }
    });
  }

  uploadReport() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      userInfo.password = this.passwordEncoderService.decryptPassword(userInfo.password);
      this.mainService.getXmlFileContent(this.filePath).then(content => {
        if (content) {
          this.timeTrackerWebService.uploadReport(userInfo, content).subscribe(result => {
            this.integrationResult = this.adapterService.getIntegrationResultModel(result);
            this.toogleErrorReportModal(true);
          }, error => {
            this.integrationResult = this.adapterService.getIntegrationResultModel(error);
            this.toogleErrorReportModal(true);
          });
        }
      });
    }
  }

  syncToggl() {
    const selectedFile = localStorage.getItem('selectedFile');
    const userInfo = JSON.parse(localStorage.getItem('toggl'));
    if (userInfo && selectedFile) {
      this.togglIntegrationService.getWeekReport(selectedFile);
    }
  }

  toogleErrorReportModal(show: boolean) {
    this.isShowErrorReportModal = show;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
