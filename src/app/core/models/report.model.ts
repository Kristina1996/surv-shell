import { SpecialItemModel } from './specialItem.model';

export class ProjectXml {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class UserXml {
  id: number;
  fullName: string;

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.fullName = firstName + ' ' + lastName;
  }
}

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
