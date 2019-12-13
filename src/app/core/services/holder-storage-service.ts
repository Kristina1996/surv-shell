import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolderStorageService {

  public updateLocalStorage = new BehaviorSubject([]);

  constructor() { }
}
