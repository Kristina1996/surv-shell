import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { ReportComponent } from './components/report/report.component';
import { FilesMenuComponent } from './components/files-menu/files-menu.component';
import { CommonPartComponent } from './components/report/common-part/common-part.component';
import { SpecialPartComponent } from './components/report/special-part/special-part.component';
import { NewReportModalComponent } from './components/new-report-modal/new-report-modal.component';

//import { HomeService } from '../core/services/home.service';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, ReportComponent, FilesMenuComponent, CommonPartComponent, SpecialPartComponent, NewReportModalComponent],
  imports: [CommonModule, TranslateModule, BrowserModule, FormsModule, ReactiveFormsModule],
  exports: [TranslateModule, WebviewDirective, ReportComponent, FilesMenuComponent, NewReportModalComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
