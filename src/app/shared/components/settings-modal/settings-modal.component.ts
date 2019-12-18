import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TimeTrackerWebService } from '../../../core/services/time-tracker-web.service';
import { PasswordEncoderService } from '../../../core/services/password-encoder.service';
import { AdapterService } from '../../../core/services/adapter.service';
import * as moment from 'moment';
import { IntegrationResultModel } from '../../../core/models/report.model';

const CLIENT_TIME_FORMAT = 'HH:mm:ss';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  username = '';
  password = '';
  domain = '';
  host = '';
  @Output() closeModal = new EventEmitter<boolean>();
  config = {
    title: 'Настройки',
    cancel: {
      title: 'Закрыть',
      visible: true
    },
    save: {
      title: 'Сохранить',
      visible: false
    }
  };
  selectedItem;
  integrationLog: string[] = [];
  integrationResult: IntegrationResultModel|boolean;
  isShowErrorReportModal = false;

  constructor(private timeTrackerWebService: TimeTrackerWebService,
              private passwordEncoderService: PasswordEncoderService,
              private cdr: ChangeDetectorRef,
              private adapterService: AdapterService) {}

  ngOnInit() {
    this.checkUserInfo();
  }

  checkUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      userInfo.password = this.passwordEncoderService.decryptPassword(userInfo.password);
      this.username = userInfo.username;
      this.password = userInfo.password;
      this.host = userInfo.host;
      this.domain = userInfo.domain;
    }
  }

  chooseItem(item) {
    this.selectedItem = item;
  }

  integrate() {
    const userInfo = { username: this.username, password: this.password, domain: this.domain, host: this.host };

    this.timeTrackerWebService.getProjectsAndUsers({...userInfo}).subscribe(([projects, users]) => {
      const successMsg = moment().format(CLIENT_TIME_FORMAT) + ' Успешно';
      this.integrationLog.push(successMsg);
      userInfo.password = this.passwordEncoderService.encryptPassword(this.password);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('users', JSON.stringify(this.adapterService.getUsersXmlModel(users)));
      localStorage.setItem('projects', JSON.stringify(this.adapterService.getProjectsXmlModel(projects)));
      this.cdr.detectChanges();
    }, error => {
      const errMsg = moment().format(CLIENT_TIME_FORMAT) + ' Ошибка (см. лог)';
      this.integrationLog.push(errMsg);
      this.integrationResult = this.adapterService.getIntegrationResultModel(error);
      this.toogleErrorReportModal(true);
      this.cdr.detectChanges();
    });
  }

  toogleErrorReportModal(show: boolean) {
    this.isShowErrorReportModal = show;
    this.cdr.detectChanges();
  }

  clickClose() {
    this.close();
  }

  private close() {
    this.closeModal.emit(false);
  }

}
