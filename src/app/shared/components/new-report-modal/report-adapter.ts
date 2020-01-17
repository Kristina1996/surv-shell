import { SPECIAL_TASKS } from '../../../core/models/special-tasks-data';
import { EmployeeModel, ProjectModel, TaskModel } from '../../../core/models/report.model';

export function getFirstReport() {
  const report = {
    common: [],
    specialTasks: [{
      employeeName: '',
      rate: 0,
      specialTasks: SPECIAL_TASKS
    }]
  };
  report.common.push(new ProjectModel());
  report.common[0].employee.push(new EmployeeModel());
  report.common[0].employee[0].tasks.push(new TaskModel());
  return report;
}

export function getSpecialTasks() {
  const specialTasks = [{
    employeeName: '',
    rate: 0,
    specialTasks: SPECIAL_TASKS
  }]
  return specialTasks;
}
