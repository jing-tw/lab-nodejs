import {Observable, Subject } from 'rxjs';
import {Characteristic, Peripheral, Service } from '@abandonware/noble';
import LoggerService from './LoggerService'

export class UtilBle {
    public static printBLEChar(strTag:string, characteristic:Characteristic) {
      let msg:string = '['+strTag+'] characteristics ' + characteristic + ' uuid = ' + characteristic.uuid;
      LoggerService.logger.info(msg);
    }
  
    public static printBLEPeripheral(peripheral:Peripheral) {
      LoggerService.logger.info('peripheral id = ' + peripheral.id);
      LoggerService.logger.info('peripheral localName = ' + peripheral.advertisement.localName);
      LoggerService.logger.info('peripheral address = ' + peripheral.address);
      LoggerService.logger.info('peripheral serviceUuids = ' + peripheral.advertisement.serviceUuids);
    }
  
    public static startNotification(characteristic:any) {
      let subject = new Subject();
    
      characteristic.on('read', (buffer:Buffer, isNotification:any) => {
        UtilBle.printBLEChar('startNotification', characteristic);
        LoggerService.logger.info('startNotification::' + buffer);
        subject.next(buffer);
      });
      
      characteristic.subscribe((err:any) => {
        if (err) {
          console.error('[BLE] %s', err);
        } else {
          console.info('[BLE] %s subscribe successfully', characteristic.uuid);
        }
      });
    
      return subject.asObservable();
    }

    public static sendCmd(bleCharacterCmd:Characteristic, strCmd:string){
        /**
         * Send command to the device
         * Usage:
         *  let strCmdStart:string = '0100';
         *  sendCmd(dictInfo['cmd_rx1'], strCmdStart);
         */
        // let characteristic_cmd_rx1 = dictInfo['cmd_rx1']; //ret_characteristics[0];
        let characteristic_cmd_rx1:Characteristic = bleCharacterCmd;
        console.log('awake after 1 sec');
  
        let command = strCmd; // '0100';
        let dataLength = '';
        let data = '';
        let cmdPackage = UtilBle.stringToHex('iCMD') + command + dataLength + data;
  
        characteristic_cmd_rx1.write(Buffer.from(cmdPackage, 'hex'), true, err => {
            if (err) {
                let msg:string = '[BLE] cmd write ' + cmdPackage + ' fail' + ' uuid = ' + characteristic_cmd_rx1.uuid;
                LoggerService.logger.error(msg);
            } else {
                let msg:string = '[BLE] cmd write ' + cmdPackage + ' success' + ' uuid = ' + characteristic_cmd_rx1.uuid;
                LoggerService.logger.info(msg);
            }
            });
    }
    
    static stringToHex(strData:string) {
      let hex = '';
      for (let i = 0; i < strData.length; i++) {
        hex += '' + strData.charCodeAt(i).toString(16);
      }
      return hex;
    }
  }