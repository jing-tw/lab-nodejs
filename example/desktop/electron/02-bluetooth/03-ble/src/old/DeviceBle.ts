import assert = require('assert');
import noble = require('@abandonware/noble');
import {Characteristic, Peripheral, Service } from '@abandonware/noble';
import {UtilBle} from './UtilBle';
import LoggerService from './LoggerService'

export default class DeviceBle {
    // public uuidService:string =          '6e400001b5a3f393e0a9e50e24dcca9e'; // 'fefb';
    private dictInfo:any = null;

    public discovery(uuidService:string) {
        /**
         * Usage:
         *  let device:DeviceBle = new DeviceBle();
         *  let peripheral:Peripheral = await device.discovery(DeviceBle.uuidService);
         */
        return new Promise<any> (async resolve => {
          this.__stateChange(uuidService);
          noble.on('discover', function(peripheral) {
            LoggerService.logger.info('discover');
            UtilBle.printBLEPeripheral(peripheral);
            noble.stopScanning();  // connect to the first peripheral that is scanned
            resolve(peripheral);
            }); // end of discovery
        }); // end of return
      }

    private __stateChange(uuidService:string){
    /**
     * Usage:
     *  __stateChange(DeviceBle.uuidService)
     */
    noble.on('stateChange', function(state:string) {
        LoggerService.logger.info('DeviceBle:: stateChange, state = ' + state);
        if (state === 'poweredOn') {
            LoggerService.logger.info('Powered On');
            LoggerService.logger.info('Scan service ' + uuidService);
            noble.startScanning([uuidService], true, (error) => {LoggerService.logger.error('start scanning. Error msg = ' + error + '\nDevice does not power on?')} ); 
            // noble.startScanning([]);
        } else {
            LoggerService.logger.info('DeviceBle:: Powered Off (The bluetooth adapter does not enable?)');
            noble.stopScanning();
        }
    });
    }
    
    //   public connect(peripheral:Peripheral) {
    //     /**
    //      * Connect to the device and return uuidCmd, notifications
    //      * Usage:
    //      *  ...
    //      *  let dictInfo:any = await device.connect(peripheral);
    //      */
    //     return new Promise<any> (async resolve => {
    //       peripheral.connect(async (error) => {
    //         LoggerService.logger.info('Connected to', peripheral.id);
    //         this.dictInfo = await this.__getNotification(peripheral);
    //         resolve(this.dictInfo);
    //         });
    //     });
    //   }
    
    //   public disConnect(peripheral:Peripheral) {
    //     peripheral.disconnect();
    //     LoggerService.logger.info('disConnect');
    //   }

      
    
    //   private __getCharacteristics(peripheral, ret_characteristics) {
    //     return new Promise<any>(resolve => {
    //         peripheral.discoverAllServicesAndCharacteristics( function (error, services, characteristics){
    //             let rx1, tx1, tx2, tx3, tx4;
    //             console.log('type of characteristics = ', typeof characteristics)
    //             services.forEach(function(service, index, array){
    //                 console.log('service ' + service + ' index ' + index)
    //             })
    //             characteristics.forEach(function(characteristic, index, array){
    //                 UtilBle.printBLEChar('getCharacteristics', characteristic);
    //                 if (characteristic.uuid === DeviceBle.uuidSendCmd){ 
    //                   LoggerService.logger.info('getCharacteristics:: Found Cmd, uuid = ' + characteristic.uuid);
    //                   rx1 = characteristic;
    //                 }
    //                 if (characteristic.uuid === DeviceBle.uuidReceivedResponse) { 
    //                   LoggerService.logger.info('getCharacteristics:: Found tx1 received response, uuid = ' + characteristic.uuid);
    //                   tx1 = characteristic;
    //                 }
    //                 if (characteristic.uuid === DeviceBle.uuidReceivedECGData) { 
    //                   LoggerService.logger.info('getCharacteristics:: Found tx2 received ECG data, uuid = ' + characteristic.uuid);
    //                   tx2 = characteristic;
    //                 }
    //                 if (characteristic.uuid === DeviceBle.uuidReceivedLog){ 
    //                   LoggerService.logger.info('getCharacteristics:: Found tx4 received log data, uuid = ' + characteristic.uuid);
    //                   tx4 = characteristic;
    //                 }
    //             }) // end of forEach
    //             ret_characteristics[0] = rx1; // send COMMAND
    //             ret_characteristics[1] = tx1; // received RESPONSE
    //             ret_characteristics[2] = tx2; // received ECG DATA
    //             ret_characteristics[3] = 0;   // received audio data
    //             ret_characteristics[4] = tx4; // received log
    //             resolve(ret_characteristics);
    //         });   // end of the callback and discovery function
    //     }); // end of resolved call-back function and Promise
    //   }

    //   private async __getNotification(peripheral){
    //     return new Promise(async(resolve) => {
    //       let retDict:Record<string, any> = {}
    //       let ret_characteristics = await this.__getCharacteristics(peripheral, new Array(1, 2, 3, 4));
    //       let cmd_rx1 = ret_characteristics[0];
    //       let characteristic_read_tx1 = ret_characteristics[1];
    //       let characteristic_read_tx2 = ret_characteristics[2];
    //       let characteristic_read_tx4 = ret_characteristics[4];
    //       let notify_tx1 = UtilBle.startNotification(characteristic_read_tx1);
    //       let notify_tx2 =  UtilBle.startNotification(characteristic_read_tx2);
    //       let notify_tx4 =  UtilBle.startNotification(characteristic_read_tx4);
    //       retDict['cmd_rx1'] = cmd_rx1;
    //       retDict['notify_tx1'] = notify_tx1;
    //       retDict['notify_tx2'] = notify_tx2;
    //       retDict['notify_tx4'] = notify_tx4;
    //       LoggerService.logger.info('char ready!');
    //       resolve(retDict)
    //     }); // end of promise
    //   }

}