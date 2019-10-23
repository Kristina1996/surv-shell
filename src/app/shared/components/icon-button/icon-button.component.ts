import {Component, Input, OnInit} from '@angular/core';
import {pathIcon} from '../../../core/icons';

@Component({
  selector: 'app-icon-button',
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="icon-button" [ngClass]="[color]" width="24" height="24" viewBox="0 0 24 24">
                                    <path [attr.d]="svgPath"/><path d="M0 0h24v24H0z" fill="none"/>
                                    <title>{{title}}</title></svg>`,
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() iconType: string;
  @Input() title: string;
  @Input() color = 'light';
  @Input() size = 'size-normal';
  public svgPath;

  constructor() { }

  ngOnInit() {
    this.svgPath = pathIcon[this.iconType];
  }
}
