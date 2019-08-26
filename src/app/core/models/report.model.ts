import { ProjectModel } from './project.model';
import { SpecialItemModel } from './specialItem.model';

export class ReportModel {
  common: ProjectModel[] = [];
  specialTasks: SpecialItemModel[];

  getLastProject() {
    console.log('количество проектов в отчете: ' + this.common[this.common.length])
    return this.common[this.common.length - 1]
  }
}
