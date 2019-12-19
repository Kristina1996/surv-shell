import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit {

  @Input() control: FormControl;
  @Input() placeHolder: string;
  @Input() type = 'text';
  @Input() isInputAutocomplete = false;
  @Input() autoCompleteType: string;
  @Output() change = new EventEmitter<string>();

  users;
  projects;
  isShowSearchBox = false;

  constructor() { }

  ngOnInit() {
    if (this.autoCompleteType === 'projects') {
      this.getProjects();
    } else if (this.autoCompleteType === 'users') {
      this.getUsers();
    }
  }

  changeInput(value) {
    this.change.emit(value);
  }

  toogleSearchBox(show) {
    // FIXME Переделать на observable
    setTimeout(() => {
      this.isShowSearchBox = show;
    }, 300);
  }

  chooseItem(value) {
    this.control.setValue(value);
  }

  hasResult(type) {
    const searchText = (this.control.value || '').toLowerCase();
    let result = false;
    if (type === 'projects') {
      if (this.projects.filter(project => project.name.toLowerCase().includes(searchText)).length > 0) {
        result = true;
      }
    } else if (type === 'users') {
      if (this.users.filter(user => user.fullName.toLowerCase().includes(searchText)).length > 0) {
        result = true;
      }
    }
    return result;
  }

  getLighterItem(value) {
    // FIXME Убрать регистрозависимость
    return value.split(this.control.value);
  }

  getProjects() {
    // FIXME Вынести в сервис получение данных
    const projects = JSON.parse(localStorage.getItem('projects'));
    if (projects) { this.projects = projects; }
  }

  getUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      this.users = [];
      users.forEach(user => {
        if (!user.fullName.includes('увол')) { this.users.push(user); }
      });
    }
  }
}
