import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { ReportComponent } from './components/report/report.component';
import { FilesMenuComponent } from './components/files-menu/files-menu.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, ReportComponent, FilesMenuComponent],
  imports: [CommonModule, TranslateModule],
  exports: [TranslateModule, WebviewDirective, ReportComponent, FilesMenuComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
