import { ProjectModel } from './project.model.ts';
import { SpecialItemModel } from './specialItem.model.ts';

export interface ReportModel {
  common: ProjectModel[];
  specialTasks: SpecialItemModel[];
}
