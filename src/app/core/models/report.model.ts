import { SpecialItemModel } from './specialItem.model';

export class ReportModel {
  common: ProjectModel[] = [];
  specialTasks: SpecialItemModel[];

  getLastProject() {
    console.log('количество проектов в отчете: ' + this.common[this.common.length])
    return this.common[this.common.length - 1]
  }
}

export class ProjectModel {
  name: string;
  employee: EmployeeModel[] = [];

  getLastEmployee() {
    return this.employee[this.employee.length - 1]
  }
}

export class EmployeeModel {
  name: string;
  tasks: TaskModel[] = [];
}

export class TaskModel {
  name: string;
  hours: number;
}
