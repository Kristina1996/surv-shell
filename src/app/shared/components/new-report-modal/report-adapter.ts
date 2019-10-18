import { SPECIALTASKS } from '../../../core/models/special-tasks-data';
import { EmployeeModel, ProjectModel, TaskModel } from '../../../core/models/report.model';

export function getFirstReport() {
  const report = {
    common: [],
    specialTasks: [{
      employeeName: '',
      rate: 0,
      specialTasks: SPECIALTASKS
    }]
  };
  report.common.push(new ProjectModel());
  report.common[0].employee.push(new EmployeeModel());
  report.common[0].employee[0].tasks.push(new TaskModel());
  return report;
}
