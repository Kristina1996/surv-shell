import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  template: `<i [ngClass]="[color, size]" class="material-icons icon-button" title="{{title}}">{{iconType}}</i>`,
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() iconType: string;
  @Input() title: string;
  @Input() color = 'light';
  @Input() size = 'size-normal';

  constructor() { }

  ngOnInit() {
  }

}
