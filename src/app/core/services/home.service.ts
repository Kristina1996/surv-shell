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
    console.log('запустился метод getFilesFromFolder в сервисе')
    return new Promise(function(resolve, reject) {
      fs.readdir(folderPath, function(err, items) {
        let files = items.filter(item => item.indexOf('.xml') != -1 || item.indexOf('.xls') != -1);
        err ? reject(err) : resolve(files);
      });
    });
  }

  getFileContent(filePath) {
    console.log('запустился метод getFileContent в сервисе')
    return new Promise(function(resolve, reject) {
      fs.readFile(filePath, function(err, content) {
        xml2js.parseString(content.toString(), function (err, result) {
                err ? reject(err) : resolve(result);
           });
      });
    });
  }

  createFile(folderPath, fileName) {
    let filePath = folderPath + "\\" + fileName
    console.log(filePath)
    return new Promise(function(resolve, reject) {
      fs.writeFile(filePath, '', (err) => {
        err ? reject(err) : resolve(filePath);
      });
    });
  }
}
