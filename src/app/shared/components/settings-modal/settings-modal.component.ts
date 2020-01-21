import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TimeTrackerWebService } from '../../../core/services/time-tracker-web.service';
import { PasswordEncoderService } from '../../../core/services/password-encoder.service';
import { AdapterService } from '../../../core/services/adapter.service';
import * as moment from 'moment';
import { IntegrationResultModel } from '../../../core/models/report.model';
import {DataStorageService} from '../../../core/services/data-storage.service';
import {TogglIntegrationService} from '../../../core/services/toggl-integration.service';

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
  togglUsername = '';
  togglPassword = '';
  togglApiToken = '';
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
              private dataStorageService: DataStorageService,
              private cdr: ChangeDetectorRef,
              private togglIntegrationService: TogglIntegrationService,
              private adapterService: AdapterService) {}

  ngOnInit() {
    this.checkUserInfo();
    this.updateTogglUserInfo();
    this.checkUserInfoToggl();
  }

  checkUserInfoToggl() {
    this.togglIntegrationService.updateTogglReport.subscribe(value => {
      if (value === 2) {
        this.updateTogglUserInfo();
      }
    });
  }

  updateTogglUserInfo() {
    const togglUserInfo = JSON.parse(localStorage.getItem('toggl'));
    this.togglUsername = (togglUserInfo.username) ? togglUserInfo.username : '';
    this.togglApiToken = (togglUserInfo.api_token) ? togglUserInfo.api_token : '';
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
    this.dataStorageService.getDataFromService({...userInfo}).subscribe(result => {
      const successMsg = moment().format(CLIENT_TIME_FORMAT) + ' Успешно';
      this.integrationLog.push(successMsg);
      userInfo.password = this.passwordEncoderService.encryptPassword(this.password);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.cdr.detectChanges();
    }, error => {
      const errMsg = moment().format(CLIENT_TIME_FORMAT) + ' Ошибка (см. лог)';
      this.integrationLog.push(errMsg);
      this.integrationResult = this.adapterService.getIntegrationResultModel(error);
      this.toogleErrorReportModal(true);
      this.cdr.detectChanges();
    });
  }

  togglIntegrate() {
    if (this.togglUsername !== '' && this.togglPassword !== '' || this.togglApiToken !== '') {
      this.togglIntegrationService.getUserData(this.togglUsername, this.togglPassword, this.togglApiToken);
      this.close();
    } else {
      this.integrationLog.push('Поля не заполнены');
    }
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
