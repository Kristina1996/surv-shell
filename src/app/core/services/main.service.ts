import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import * as xml2js from 'xml2js';
import * as path from 'path';
import {ElectronService} from './electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private subject = new BehaviorSubject(0);
  data = this.subject.asObservable();

  constructor(private electronService: ElectronService) {}

  newReportAlert() {
    this.subject.next(1);
  }

  getFilesFromFolder(folderPath) {
    return new Promise((resolve, reject) => {
      this.electronService.fs.readdir(folderPath, (err, items) => {
        const files = items.filter(item => item.endsWith('.xml') || item.endsWith('.xls'));
        err ? reject(err) : resolve(files);
      });
    });
  }

  getFileContent(filePath) {
    return new Promise((resolve, reject) => {
      this.electronService.fs.readFile(filePath, (err, content) => {
        // Проверка на существование файла
        if (!content) {
          reject(err);
        } else {
          xml2js.parseString(content.toString(), (error, result) => {
            error ? reject(error) : resolve(result);
          });
        }
      });
    });
  }

  getXmlFileContent(filePath) {
    return new Promise((resolve, reject) => {
      this.electronService.fs.readFile(filePath, (err, content) => {
        (!content) ? reject(err) : resolve(content.toString());
      });
    });
  }

  isExistReport(filePath) {
    return new Promise((resolve, reject) => {
      this.electronService.fs.readFile(filePath, (err, content) => {
        if (content) { resolve(true); } else { reject(false); }
      });
    });
  }

  createFile(folderPath, fileName) {
    const filePath = path.join(folderPath, fileName);
    return new Promise((resolve, reject) => {
      this.electronService.fs.writeFile(filePath, '', (err) => {
        err ? reject(err) : resolve(filePath);
      });
    });
  }

  saveFile(filePath, data) {
    return new Promise((resolve, reject) => {
      this.electronService.fs.writeFile(filePath, data, (err) => {
        err ? reject(err) : resolve(filePath);
      });
    });
  }
}
