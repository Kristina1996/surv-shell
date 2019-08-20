import { EmployeeModel } from './employee.model.ts';

export interface ProjectModel {
  name: string;
  employee: EmployeeModel[];
}
