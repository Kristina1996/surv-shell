import { EmployeeModel } from './employee.model';

export class ProjectModel {
  name: string;
  employee: EmployeeModel[] = [];
  comment: string;

  getLastEmployee() {
    return this.employee[this.employee.length - 1]
  }
}
