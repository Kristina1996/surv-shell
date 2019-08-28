import { Component, OnInit, Input } from '@angular/core';

import { ProjectModel } from '../../../../core/models/report.model';
import { EmployeeModel } from '../../../../core/models/report.model';
import { TaskModel } from '../../../../core/models/report.model';

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

  addTask(prjNum, emplNum) {
    let emptyTask: TaskModel = new TaskModel();
    this.data[prjNum].employee[emplNum].tasks.push(emptyTask);
  }

  addEmployee(prjNum) {
    let emptyEmployee: EmployeeModel = new EmployeeModel();
    this.data[prjNum].employee.push(emptyEmployee);
  }

  addProject() {
    let emptyPrj: ProjectModel = new ProjectModel();
    this.data.push(emptyPrj);
  }

  saveReport() {
    console.log(this.data)
  }

}
