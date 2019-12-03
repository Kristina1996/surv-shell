import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  template: `<input placeholder="{{placeHolder}}" [formControl]="control" type="{{type}}" pattern="{{pattern}}" (change)="changeInput($event)">`,
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() placeHolder: string;
  @Input() type = 'text';
  @Input() pattern = '';
  @Output() change = new EventEmitter<string>();
  inputText: string;

  constructor() {}

  ngOnInit() {}

  changeInput(event) {
    this.change.emit(event.target.value);
  }

}
