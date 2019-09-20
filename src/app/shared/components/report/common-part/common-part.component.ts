import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Subscription} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';

import { ProjectModel } from '../../../../core/models/report.model';
import { EmployeeModel } from '../../../../core/models/report.model';
import { TaskModel } from '../../../../core/models/report.model';

import { FormServiceService } from '../../../../core/services/form-service.service';

@Component({
  selector: 'app-common-part',
  templateUrl: './common-part.component.html',
  styleUrls: ['./common-part.component.scss']
})
export class CommonPartComponent implements OnInit, OnChanges {

  @Input() data: any;
  form: FormArray;
  subscription: Subscription;

  public currentDate = moment().format('YYYY-MM-DD');

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormServiceService
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.form = this.formService.makeCommonForm(this.data);
    console.log(this.form);
    this.form.valueChanges.pipe(debounceTime(1000)).subscribe(values => {
      console.log(values);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = changes.data.currentValue;
    this.form = this.formService.makeCommonForm(this.data);
  }

  addTask(empl) {
    const emptyTask: TaskModel = null;
    empl.controls.tasks.push(this.formService.makeTaskForm(emptyTask));
  }

  addEmployee(project) {
    const emptyEmpl: EmployeeModel = null;
    project.controls.employee.push(this.formService.makeEmployeeForm(emptyEmpl));
  }

  addProject() {
    const emptyPrj: ProjectModel = null;
    this.form.controls.push(this.formService.makeProjectForm(emptyPrj));
    this.form.updateValueAndValidity();
  }

}
