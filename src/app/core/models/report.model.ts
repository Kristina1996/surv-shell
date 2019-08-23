import { ProjectModel } from './project.model';
import { SpecialItemModel } from './specialItem.model';

export class ReportModel {
  common: ProjectModel[];
  specialTasks: SpecialItemModel[];

  getLastProject() {
    return this.common[this.common.length - 1]
  }
}
