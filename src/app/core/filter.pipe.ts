import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, labelKey?: string): any {
    if (!items || !searchTerm) {
      return items;
    }
    if (items[0].name) {
      return items.filter(item => item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) === true
      );
    } else if (items[0].fullName) {
      return items.filter(item => item.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) === true
      );
    }
  }
}
