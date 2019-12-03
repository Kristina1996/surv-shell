import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import {forkJoin, Observable, Subject} from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerWebService {

  soap;
  public projects = new Subject();
  public users = new Subject();

  constructor(private electronService: ElectronService) {
    this.soap = this.electronService.soap;
  }

  getProjectsAndUsers(userInfo) {
    return this.createClient(userInfo).pipe(
      mergeMap(client => {
        return forkJoin([this.getProjects(client), this.getUsers(client)]);
      })
    );
  }

  getProjects(client) {
    return new Observable(observer => {
      client.GetProjects(null, (error, response) => {
        if (error) {
          observer.error(error);
          console.error(error);
        } else {
          observer.next(response.GetProjectsResult.ProjectDto);
          observer.complete();
        }
      });
    });
  }

  getUsers(client) {
    return new Observable(observer => {
      client.GetUsers(null, (error, response) => {
        if (error) {
          observer.error(error);
          console.error(error);
        } else {
          observer.next(response.GetUsersResult.UserDto);
          observer.complete();
        }
      });
    });
  }

  private createClient(userInfo): Observable<any> {
    return new Observable( observer => {
      const security = new this.soap.NTLMSecurity(userInfo);
      this.soap.createClient('http://' + userInfo.host + '/timetrackertest/TimeTrackerWebService.asmx?WSDL', {wsdl_options: {...userInfo}},  (err, client) => {
        if (err) {
          observer.error(err);
          console.error(err);
        } else {
          client.setSecurity(security);
          observer.next(client);
        }
      });
    });
  }
}
