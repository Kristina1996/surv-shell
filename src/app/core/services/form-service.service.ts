import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray  } from '@angular/forms';

import { ProjectModel } from '../../core/models/report.model';
import { EmployeeModel } from '../../core/models/report.model';
import { TaskModel } from '../../core/models/report.model';

import { SpecialItemModel } from '../../core/models/specialItem.model';
import { SpecialTaskModel } from '../../core/models/specialItem.model';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(private formBuilder: FormBuilder) { }

  makeCommonForm(commonPart: ProjectModel[]): FormArray {
      return this.formBuilder.array(
        commonPart ? commonPart.map(prj => this.makeProjectForm(prj)) : []
      )
  }

  makeSpecialForm(specialPart: SpecialItemModel[]): FormArray {
      return this.formBuilder.array(
        specialPart ? specialPart.map(specialItem => this.makeSpecialItemForm(specialItem)) : []
      )
  }

  makeProjectForm(project: ProjectModel): FormGroup {
    if (!project) {
      project = new ProjectModel();
    }
    const result = this.formBuilder.group({
      name: project.name,
      employee: this.formBuilder.array(
        project.employee ? project.employee.map(empl => this.makeEmployeeForm(empl)) : []
      ),
    });
    return result;
  }

  makeSpecialItemForm(specialPart: SpecialItemModel): FormGroup {
    const result = this.formBuilder.group({
      employeeName: specialPart.employeeName,
      rate: specialPart.rate,
      specialTasks: this.formBuilder.array(
        specialPart.specialTasks ? specialPart.specialTasks.map(specTask => this.makeSpecialTaskForm(specTask)) : []
      ),
    });
    return result;
  }

  makeEmployeeForm(employee: EmployeeModel): FormGroup {
    if(!employee) {
      employee = new EmployeeModel();
    }
    const result = this.formBuilder.group({
      name: employee.name,
      tasks: this.formBuilder.array(
        employee.tasks ? employee.tasks.map(task => this.makeTaskForm(task)) : []
      ),
    });
    return result;
  }

  makeTaskForm(task: TaskModel): FormGroup {
    if (!task) {
      task = new TaskModel();
    }
    const result = this.formBuilder.group({
      name: task.name,
      hours: task.hours
    });
    return result;
  }

  makeSpecialTaskForm(task: SpecialTaskModel): FormGroup {
    const result = this.formBuilder.group({
      name: task.name,
      hours: task.hours
    });
    return result;
  }
}
