import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public electronService: ElectronService,
              private translate: TranslateService,
              private titleService: Title) {
    translate.setDefaultLang('en');
    if (electronService.isElectron) { } else { }
    const appVersion = window.require('electron').remote.app.getVersion();
    this.titleService.setTitle('SurvShell ' + appVersion);
  }
}
