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
    let report: ReportModel;
    /*
    report.common = obj.Workbook.Worksheet[0];

    // получение специальных задач
    for(let item in obj.Workbook.Worksheet[1].Table[0].Row) {

    }
    let row = obj.Workbook.Worksheet[1].Table[0].Row;
    let size = obj.Workbook.Worksheet[1].Table[0].Row.length;
    let specialItems: SpecialItemModel[];
    let iterator = 0;
    for(let i = 1; i < size++; i++) {
      while(row[i].Cell.indexOf('empl_') != -1 && i != 0) {
        specialItems[]
      }
      if(row[i].Cell.indexOf('empl_') == -1)

      row[i].Cell
    }
    */

    //report.common = obj.Workbook.Worksheet[0];
    //report.specialTasks = obj.Workbook.Worksheet[1];

    let specialItems: SpecialItemModel[];
    let iterator = 0;
    let specialTasksXML = obj.Workbook.Worksheet[1].Table[0].Row;

    specialTasksXML.forEach((row, index) => {
      let rowString = JSON.stringify(row)

      if(rowString.includes('empl_')) {
      }
    });

    return report;


    /*
    let a = obj.Workbook.Worksheet[1].map(item => {
      item
    })*/
  }
}
