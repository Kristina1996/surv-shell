import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as soap from 'soap';
import * as crypto from 'crypto';
import * as os from 'os';
import * as httpntlm from 'httpntlm';
import * as https from 'https';
import * as request from 'request';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  soap: typeof soap;
  crypto: typeof crypto;
  os: typeof os;
  httpntlm: typeof httpntlm;
  https: typeof https;
  request: typeof request;

  get isElectron() {
    return window && window.process && window.process.type;
  }

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.soap = window.require('soap');
      this.crypto = window.require('crypto');
      this.os = window.require('os');
      this.httpntlm = window.require('httpntlm');
      this.https = window.require('https');
      this.request = window.require('request');
    }
  }
}
