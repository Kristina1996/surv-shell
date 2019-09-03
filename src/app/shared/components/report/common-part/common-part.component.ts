import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Subscription} from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ProjectModel } from '../../../../core/models/report.model';
import { EmployeeModel } from '../../../../core/models/report.model';
import { TaskModel } from '../../../../core/models/report.model';

import { FormServiceService } from '../../../../core/services/form-service.service';

@Component({
  selector: 'app-common-part',
  templateUrl: './common-part.component.html',
  styleUrls: ['./common-part.component.scss']
})
export class CommonPartComponent implements OnInit {

  @Input() data: any;
  form: FormArray;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormServiceService
  ) {}

  ngOnInit() {
    this.form = this.formService.makeCommonForm(this.data);
    this.form.valueChanges.pipe(debounceTime(1000)).subscribe(values => {
      console.log(values);
    });
    /*
    this.subscription = this.form.valueChanges.subscribe(values => {
      console.log('в сабскрипшене');
      console.log(values);
    });
     */
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
