import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IModalConfig } from './modal-config';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent implements OnInit {

  @Input() config: IModalConfig;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  clickClose() {
    this.close();
  }

  clickSave() {
    this.save.emit(true);
  }

  private close() {
    this.closeModal.emit(false);
  }

}
