import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  template: `<input placeholder="{{placeHolder}}" [formControl]="control">`,
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() placeHolder: string;

  constructor() { }

  ngOnInit() {}

}
