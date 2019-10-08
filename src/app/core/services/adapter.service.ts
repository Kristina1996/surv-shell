import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { ReportModel } from '../../core/models/report.model';
import { ProjectModel } from '../../core/models/report.model';
import { EmployeeModel } from '../../core/models/report.model';
import { TaskModel } from '../../core/models/report.model';

import { SpecialItemModel } from '../../core/models/specialItem.model';
import { SpecialTaskModel } from '../../core/models/specialItem.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterService {

  constructor() { }

  getModel(obj): ReportModel {
    let report: ReportModel = new ReportModel();

    const commonRows = this.getRows(obj, 0);
    const specialRows = this.getRows(obj, 1);

    // commonRows.shift();
    // specialRows.shift();

    if (commonRows.includes('Отчет по проекту')) { commonRows.shift(); }
    if (specialRows.includes('Специальные задачи')) { specialRows.shift(); }

    commonRows.forEach(row => {
      if(row.includes('prnm_')) {
        let project: ProjectModel = new ProjectModel();
        project.name = row[1];
        report.common.push(project);
      } else if(row.includes('empl_')) {
        let employee: EmployeeModel = new EmployeeModel();
        employee.name = row[1];
        report.getLastProject().employee.push(employee);
      } else {
        let task: TaskModel = new TaskModel();
        task.name = row[0];
        task.hours = row[1];
        if (row[2]) { task.date = row[2]; } else { task.date = ''; }
        report.getLastProject().getLastEmployee().tasks.push(task);
      }

    });

    specialRows.forEach(row => {
      if(row.includes('empl_')) {
        let specialItem: SpecialItemModel = new SpecialItemModel();
        specialItem.employeeName = row[1];
        specialItem.rate = row[2];
        report.specialTasks.push(specialItem);
      } else {
        let specialTask: SpecialTaskModel = new SpecialTaskModel();
        specialTask.name = row[0];
        specialTask.hours = row[1];
        if(row[2]) specialTask.comment = row[2];
        report.getLastSpecialItem().specialTasks.push(specialTask);
      }

    });

    return report;
  }

  private getRows(data: any, page: number) {
    const cells = data.Workbook.Worksheet[page].Table[0].Row
                  .map(item => item.Cell)
                  .filter(item => Array.isArray(item));
    const dataItems = cells.map(cell => cell.filter(item => item.Data).map(item => item.Data));
    const rows = dataItems.map(item => item.map(attr => attr[0]._))
                          .filter(row => row.length > 0 && row[0] != 'comment_');
    return rows;
  }
}
