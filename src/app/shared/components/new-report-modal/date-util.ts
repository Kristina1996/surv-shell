import * as moment from 'moment';
import { FileModel } from './file.model';

export function getYearsList() {
  const yearsList = [];
  const currentYear = moment().year();
  const nextYear = currentYear + 1;
  for (let i = 2006; i <= nextYear; i++) { yearsList.push(i); }
  return yearsList;
}

export function getWeeksList(selectedYear) {
  const filesList: FileModel[] = [];
  const selectedDate = moment().set('year', selectedYear);
  const weeks = moment(selectedDate).isoWeeksInYear();
  const currentWeek = moment().isoWeek();
  let firstDay = moment(selectedDate).startOf('year');
  let currentFileName;

  for (let i = 0; i < weeks; i++) {
    const file = new FileModel();
    file.numberOfWeek = i + 1;
    file.startWeek = moment(firstDay).startOf('isoWeek').format('DD.MM.YYYY');
    file.endWeek = moment(firstDay).endOf('isoWeek').format('DD.MM.YYYY');
    file.nameListItem = file.numberOfWeek + ': ' + file.startWeek + ' - ' + file.endWeek;
    if (file.numberOfWeek < 10) {
      file.fileName = '0' + file.numberOfWeek + '_' + file.startWeek + '-' + file.endWeek + '.xls';
    } else {
      file.fileName = file.numberOfWeek + '_' + file.startWeek + '-' + file.endWeek + '.xls';
    }

    if (currentWeek === file.numberOfWeek) { currentFileName = file.fileName; }
    filesList.push(file);
    firstDay = firstDay.add(1, 'week');
  }
  return { currentFileName, filesList };
}
