import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-part',
  templateUrl: './common-part.component.html',
  styleUrls: ['./common-part.component.scss']
})
export class CommonPartComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
