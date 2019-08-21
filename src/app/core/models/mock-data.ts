import { EmployeeModel } from './employee.model';
import { ProjectModel } from './project.model';
import { ReportModel } from './report.model';
import { TaskModel } from './task.model';
import { SpecialItemModel } from './specialItem.model';

export const TASKS: TaskModel[] = [
  { name: 'Задача 1', hours: 2 },
  { name: 'Задача 2', hours: 1 },
  { name: 'Задача 3', hours: 4 },
  { name: 'Задача 4', hours: 3 }
];

export const SPECIALITEMS: SpecialItemModel[] = [
  { employeeName: 'Владимир Пупкин', rate: 1.0, vacation: 0, sickLeave: 0, daysOff: 0, unpaidLeave: 0, nonCoreTasks: 0, downtime: 0, overtime: 9 },
  { employeeName: 'Дмитрий Сидоров', rate: 0.75, vacation: 0, sickLeave: 3, daysOff: 0, unpaidLeave: 0, nonCoreTasks: 0, downtime: 1, overtime: 0 },
  { employeeName: 'Кирилл Гундяев', rate: 1.0, vacation: 5, sickLeave: 8, daysOff: 0, unpaidLeave: 0, nonCoreTasks: 0, downtime: 6, overtime: 1 },
  { employeeName: 'Илья Мединский', rate: 0.5, vacation: 0, sickLeave: 0, daysOff: 0, unpaidLeave: 0, nonCoreTasks: 0, downtime: 0, overtime: 3 }
];

export const EMPLOYEE: EmployeeModel[] = [
  { name: 'Иван Сидоров', tasks: [TASKS[1]] },
  { name: 'Илья Иванов', tasks: [TASKS[1]] },
  { name: 'Надежда Волкова', tasks: [TASKS[1]] },
  { name: 'Михаил Сипягин', tasks: [TASKS[1]] }
];

export const PROJECTS: ProjectModel[] = [
  { name: 'Super Project', employee: [EMPLOYEE[1]] },
  { name: 'Super Puper Project', employee: [EMPLOYEE[2]] },
  { name: 'Unreal Project', employee: [EMPLOYEE[1]] }
];

export const REPORTS: ReportModel[] = [
  { common: [PROJECTS[1]], specialTasks: [SPECIALITEMS[1]] },
  { common: [PROJECTS[1]], specialTasks: [SPECIALITEMS[1]] },
  { common: [PROJECTS[1]], specialTasks: [SPECIALITEMS[1]] },
];
