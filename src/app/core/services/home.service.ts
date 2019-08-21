import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  getFilesFromFolder(folderPath) {
    return new Promise(function(resolve, reject){
      fs.readdir(folderPath, function(err, items) {
        let files = items.filter(item => item.indexOf('.xml') != -1);
        err ? reject(err) : resolve(files);
      });
    });
  }
}
