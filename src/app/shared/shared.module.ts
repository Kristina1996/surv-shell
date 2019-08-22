import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, ReportComponent],
  imports: [CommonModule, TranslateModule],
  exports: [TranslateModule, WebviewDirective]
})
export class SharedModule {}
