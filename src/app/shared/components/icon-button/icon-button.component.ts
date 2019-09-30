import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  template: `<i class="material-icons icon-button" title="{{title}}">{{iconType}}</i>`,
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() iconType: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
