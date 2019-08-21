import { EmployeeModel } from './employee.model';

export interface ProjectModel {
  name: string;
  employee: EmployeeModel[];
}
