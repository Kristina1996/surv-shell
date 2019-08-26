import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { ReportModel } from '../../core/models/report.model';
import { ProjectModel } from '../../core/models/project.model';
import { EmployeeModel } from '../../core/models/employee.model';
import { SpecialItemModel } from '../../core/models/specialItem.model';
import { TaskModel } from '../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterService {

  //report: ReportModel;

  constructor() { }

  getModel(obj): ReportModel {
    let report: ReportModel = new ReportModel();

    let specialItems: SpecialItemModel[];
    const cells = obj.Workbook.Worksheet[0].Table[0].Row
                  .map(item => item.Cell)
                  .filter(item => Array.isArray(item));

    const dataItems = cells.map(cell => cell.filter(item => item.Data).map(item => item.Data));
    const rows = dataItems.map(item => item.map(attr => attr[0]._))
                          .filter(row => row.length > 0 && row[0] != 'comment_');
    rows.shift();

    rows.forEach(row => {
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
        report.getLastProject().getLastEmployee().tasks.push(task);
      }
      console.log(report)
    });
    return report;
  }
}
