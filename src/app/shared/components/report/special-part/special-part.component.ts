import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-special-part',
  templateUrl: './special-part.component.html',
  styleUrls: ['./special-part.component.scss']
})
export class SpecialPartComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {

  }

}
