import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import * as fs from 'fs';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  getFilesFromFolder(folderPath) {
    return new Promise(function(resolve, reject){
      fs.readdir(folderPath, function(err, items) {
        let files = items.filter(item => item.indexOf('.xml') != -1 || item.indexOf('.xls') != -1);
        err ? reject(err) : resolve(files);
      });
    });
  }

  getFileContent(filePath) {
    return new Promise(function(resolve, reject){
      fs.readFile(filePath, function(err, content) {
        xml2js.parseString(content.toString(), function (err, result) {
                console.log(result); // Prints JSON object!
                err ? reject(err) : resolve(result);
           });

        /*
        console.log('в сервисе: ' + content)
        err ? reject(err) : resolve(content.toString());
        */
      });
    });
  }
}
