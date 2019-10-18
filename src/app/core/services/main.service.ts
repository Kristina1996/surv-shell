import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import * as fs from 'fs';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private subject = new BehaviorSubject(0);
  data = this.subject.asObservable();

  constructor() {}

  newReportAlert() {
    this.subject.next(1);
  }

  getFilesFromFolder(folderPath) {
    console.log('запустился метод getFilesFromFolder в сервисе');
    return new Promise(function(resolve, reject) {
      fs.readdir(folderPath, function(err, items) {
        const files = items.filter(item => item.endsWith('.xml') || item.endsWith('.xls'));
        err ? reject(err) : resolve(files);
      });
    });
  }

  getFileContent(filePath) {
    console.log('запустился метод getFileContent в сервисе');
    return new Promise(function(resolve, reject) {
      fs.readFile(filePath, function(err, content) {
        // Проверка на существование файла
        if (!content) {
          console.log('отчета не существует. выкидываю реджект');
          reject(err);
        } else {
          xml2js.parseString(content.toString(), function (error, result) {
            error ? reject(error) : resolve(result);
          });
        }
      });
    });
  }

  isExistReport(filePath) {
    return new Promise(function(resolve, reject) {
      fs.readFile(filePath, function(err, content) {
        if (content) { resolve(true); } else { reject(false); }
      });
    });
  }

  createFile(folderPath, fileName) {
    const filePath = folderPath + '\\' + fileName;
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
