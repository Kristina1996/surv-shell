import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordEncoderService {
  crypto;
  os;

  constructor(private electronService: ElectronService) {
    this.crypto = this.electronService.crypto;
    this.os = this.electronService.os;
  }

  encryptPassword(password) {
    const cipher = this.crypto.createCipher('aes-256-ctr', this.getMachineId())
    let crypted = cipher.update(password, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  decryptPassword(encrypted) {
    const decipher = this.crypto.createDecipher('aes-256-ctr', this.getMachineId())
    let dec = decipher.update(encrypted, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }

  getMachineId() {
    let machineIdString = '';
    // mac addresses
    const interfaces = this.os.networkInterfaces();
    const interfaceNames = Object.keys(interfaces);
    const macAddresses = new Set();
    for (const interfaceName of interfaceNames) {
      for (const iface of interfaces[interfaceName]) {
        macAddresses.add(iface.mac);
      }
    }
    const addressesArray = Array.from(macAddresses);
    machineIdString += addressesArray.sort().join('/') + '|';
    machineIdString += this.os.totalmem() + '|';
    const cpuInfo = this.os.cpus();
    machineIdString += cpuInfo[0].model + '/' + cpuInfo.length;
    return this.crypto.createHash('md5').update(machineIdString).digest('hex');
  }
}
