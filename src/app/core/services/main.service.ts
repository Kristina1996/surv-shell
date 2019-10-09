import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import * as fs from 'fs';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  getFilesFromFolder(folderPath) {
    console.log('запустился метод getFilesFromFolder в сервисе')
    return new Promise(function(resolve, reject) {
      fs.readdir(folderPath, function(err, items) {
        const files = items.filter(item => item.endsWith('.xml') || item.endsWith('.xls'));
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
    const filePath = folderPath + '\\' + fileName
    console.log(filePath)
    return new Promise(function(resolve, reject) {
      fs.writeFile(filePath, '', (err) => {
        err ? reject(err) : resolve(filePath);
      });
    });
  }

  saveFile(filePath, data) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(filePath, data, (err) => {
        err ? reject(err) : resolve(filePath);
      });
    });
  }
}
