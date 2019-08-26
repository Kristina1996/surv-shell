export class SpecialItemModel {
  employeeName: string;
  rate: number;
  specialTasks: SpecialTaskModel[] = [];
}

export class SpecialTaskModel {
  name: string;
  hours: number;
  comment: string;
}
