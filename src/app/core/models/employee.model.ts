import { TaskModel } from './task.model';

export interface EmployeeModel {
  name: string;
  tasks: TaskModel[];
}
