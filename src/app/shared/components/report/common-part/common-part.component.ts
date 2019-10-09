import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Subscription} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';

import { ProjectModel } from '../../../../core/models/report.model';
import { EmployeeModel } from '../../../../core/models/report.model';
import { TaskModel } from '../../../../core/models/report.model';
import { SPECIALTASKS } from '../../../../core/models/special-tasks-data';

import { FormServiceService } from '../../../../core/services/form-service.service';
import {ParseToXmlService} from '../../../../core/services/parse-to-xml.service';
import {MainService} from '../../../../core/services/main.service';
import {SpecialItemModel} from '../../../../core/models/specialItem.model';

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
    private formService: FormServiceService,
    private parseToXmlService: ParseToXmlService,
    private mainService: MainService,
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.form = this.formService.makeCommonForm(this.data.common);
    console.log(this.form);
    this.formValueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = changes.data.currentValue;
    this.form = this.formService.makeCommonForm(this.data.common);
    this.formValueChanges();
  }

  formValueChanges() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(values => {
      console.log(values);

      const uniqueEmployee = new Set();
      values.forEach(project => {
        project.employee.forEach(empl => {
          uniqueEmployee.add(empl.name);
        });
      });

      const formValue = this.formService.getForm().getRawValue();

      const specialItems: SpecialItemModel[] = [];
      uniqueEmployee.forEach(empl => {
        const index = formValue.specialForm.findIndex(element => element.employeeName === empl);
        if (index !== -1) { specialItems.push(formValue.specialForm[index]);
        } else {
          const newSpecialItem: SpecialItemModel = new SpecialItemModel();
          newSpecialItem.employeeName = String(empl);
          newSpecialItem.rate = 0;
          newSpecialItem.specialTasks = SPECIALTASKS;
          specialItems.push(newSpecialItem);
        }
      });
      formValue.specialForm = specialItems;
      this.data.specialTasks = specialItems;

      const content = this.parseToXmlService.parseToXml(formValue);
      this.mainService.saveFile(localStorage.getItem('folderPath') + '\\' + localStorage.getItem('selectedFile'), content);
      console.log('данные сохранены');
    });
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
    const emptyPrj: ProjectModel = new ProjectModel();
    emptyPrj.employee.push(new EmployeeModel());
    emptyPrj.employee[0].tasks.push(new TaskModel());
    this.form.push(this.formService.makeProjectForm(emptyPrj));
  }

  deleteProject(index) {
    this.form.removeAt(index);
  }

  deleteEmployee(proj, index) {
    proj.controls.employee.removeAt(index);
  }

  deleteTask(empl, index) {
    empl.controls.tasks.removeAt(index);
  }

}
