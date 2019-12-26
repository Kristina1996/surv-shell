import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {TimeTrackerWebService} from './time-tracker-web.service';
import {AdapterService} from './adapter.service';
import {ProjectXml, UserXml} from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private projects = new ReplaySubject<ProjectXml[]>();
  private users = new ReplaySubject<UserXml[]>();

  constructor(private timeTrackerWebService: TimeTrackerWebService,
              private adapterService: AdapterService) {}

  getDataFromService(userInfo) {
    return new Observable( observer => {
      this.timeTrackerWebService.getProjectsAndUsers({...userInfo}).subscribe(([projects, users]) => {
        const projectsModel = this.adapterService.getProjectsXmlModel(projects);
        const usersModel = this.adapterService.getUsersXmlModel(users);
        this.projects.next(projectsModel);
        this.users.next(usersModel);
        localStorage.setItem('users', JSON.stringify(usersModel));
        localStorage.setItem('projects', JSON.stringify(projectsModel));
        observer.next('success');
      }, error => observer.error(error));
    });
  }

  updateDataFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users'));
    const projects = JSON.parse(localStorage.getItem('projects'));
    this.projects.next(projects);
    this.users.next(users);
  }

  getProjects(): ReplaySubject<ProjectXml[]> {
    return this.projects;
  }

  getUsers(): ReplaySubject<UserXml[]> {
    return this.users;
  }
}
