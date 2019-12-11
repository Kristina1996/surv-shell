import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimeTrackerWebService } from '../../../core/services/time-tracker-web.service';
import { PasswordEncoderService } from '../../../core/services/password-encoder.service';
import { AdapterService } from '../../../core/services/adapter.service';
import {Observable} from 'rxjs';

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
  error: any;
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

  constructor(private timeTrackerWebService: TimeTrackerWebService,
              private passwordEncoderService: PasswordEncoderService,
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
    const userInfoCopy = Object.assign({}, userInfo);

    this.timeTrackerWebService.getProjectsAndUsers({...userInfoCopy}).subscribe(([projects, users]) => {
      userInfo.password = this.passwordEncoderService.encryptPassword(this.password);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('users', JSON.stringify(this.adapterService.getUsersXmlModel(users)));
      localStorage.setItem('projects', JSON.stringify(this.adapterService.getProjectsXmlModel(projects)));
      this.close();
    }, error => {
      this.error = 'Возникла ошибка. Для получения подробной информации смотрите лог.';
    });
  }

  clickClose() {
    this.close();
  }

  private close() {
    this.closeModal.emit(false);
  }

}
