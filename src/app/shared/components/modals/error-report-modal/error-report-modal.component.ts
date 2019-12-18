import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IntegrationResultModel } from '../../../../core/models/report.model';

@Component({
  selector: 'app-error-report-modal',
  templateUrl: './error-report-modal.component.html',
  styleUrls: ['./error-report-modal.component.scss']
})
export class ErrorReportModalComponent implements OnInit {

  @Input() integrationResult: IntegrationResultModel;
  @Output() closeModal = new EventEmitter<boolean>();
  config = {
    title: 'Загрузка отчёта',
    cancel: {
      title: 'Закрыть',
      visible: true
    },
    save: {
      title: 'Сохранить',
      visible: false
    }
  };

  constructor() { }

  ngOnInit() {
    console.log(this.integrationResult);
  }

  onClickClose() {
    this.closeModal.emit(false);
  }

}
