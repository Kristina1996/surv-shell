import { SpecialTaskModel } from './specialItem.model';

export const SPECIAL_TASKS_DESCRIPTIONS: {name: string, description: string}[] = [
  { name: 'Отгулы', description: '' },
  { name: 'Больничный лист', description: '' },
  { name: 'Отпуск', description: '' },
  { name: 'ОБСЗ', description: 'Отпуск без сохранения заработной платы' },
  { name: 'Непрофильные задачи', description: '' },
  { name: 'Простои', description: '' },
  { name: 'Дополнительно оплаченное время', description: '' }
];

export const SPECIAL_TASKS: SpecialTaskModel[] = [
  { name: SPECIAL_TASKS_DESCRIPTIONS[0].name, hours: 0, comment: '' },
  { name: SPECIAL_TASKS_DESCRIPTIONS[1].name, hours: 0, comment: '' },
  { name: SPECIAL_TASKS_DESCRIPTIONS[2].name, hours: 0, comment: '' },
  { name: SPECIAL_TASKS_DESCRIPTIONS[3].name, hours: 0, comment: '' },
  { name: SPECIAL_TASKS_DESCRIPTIONS[4].name, hours: 0, comment: '' },
  { name: SPECIAL_TASKS_DESCRIPTIONS[5].name, hours: 0, comment: '' },
  { name: SPECIAL_TASKS_DESCRIPTIONS[6].name, hours: 0, comment: '' }
];
