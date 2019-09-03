import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { FormServiceService } from '../../../../core/services/form-service.service';
import {TaskModel} from '../../../../core/models/report.model';
import {SpecialItemModel, SpecialTaskModel} from '../../../../core/models/specialItem.model';

@Component({
  selector: 'app-special-part',
  templateUrl: './special-part.component.html',
  styleUrls: ['./special-part.component.scss']
})
export class SpecialPartComponent implements OnInit {

  @Input() data: any;
  form: FormArray;

  constructor(private formService: FormServiceService) { }

  ngOnInit() {
    this.form = this.formService.makeSpecialForm(this.data);
    console.log(this.form);
    this.form.valueChanges.pipe( debounceTime(1000)).subscribe(values => {
      console.log(values);
    });
  }

  addSpecialItem() {
    const emptySpecialItem: SpecialItemModel = null;
    this.form.controls.push(this.formService.makeSpecialItemForm(emptySpecialItem));
    console.log(this.form);
  }

  addSpecialTask(specialItem) {
    const emptySpecialTask: SpecialTaskModel = null;
    specialItem.controls.specialTasks.push(this.formService.makeSpecialTaskForm(emptySpecialTask));
  }

}
