import { ProjectModel } from './project.model';
import { SpecialItemModel } from './specialItem.model';

export interface ReportModel {
  common: ProjectModel[];
  specialTasks: SpecialItemModel[];
}
