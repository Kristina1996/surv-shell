import { TaskModel } from './task.model.ts';

export interface EmployeeModel {
  name: string;
  tasks: TaskModel[];
}
