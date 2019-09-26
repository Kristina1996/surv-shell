import { SpecialItemModel } from './specialItem.model';

export class ReportModel {
  common: ProjectModel[] = [];
  specialTasks: SpecialItemModel[] = [];

  getLastProject() {
    return this.common[this.common.length - 1];
  }

  getLastSpecialItem() {
    return this.specialTasks[this.specialTasks.length - 1];
  }
}

export class ProjectModel {
  name: string;
  employee: EmployeeModel[] = [];

  getLastEmployee() {
    return this.employee[this.employee.length - 1];
  }
}

export class EmployeeModel {
  name: string;
  tasks: TaskModel[] = [];
}

export class TaskModel {
  name: string;
  hours: number;
  date: string;
}
