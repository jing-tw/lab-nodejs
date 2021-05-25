import assert = require('assert');
import noble = require('@abandonware/noble');
import {Characteristic, Peripheral, Service } from '@abandonware/noble';
import {UtilBle} from './UtilBle';
import DeviceBle from './DeviceBle';
import LoggerService from './LoggerService'



// export default class DeviceEcgW12 extends DeviceBle {
//   /**
//    * The 12L ECG Device Class
//    * 
//    * @example
//    * let device:DeviceEcgW12 = new DeviceEcgW12();
//     LoggerService.logger.info('main:: Discover the device ..., uuidServic = ' + DeviceEcgW12.uuidService);
//     let peripheral:Peripheral = await device.discovery(DeviceEcgW12.uuidService);
//     LoggerService.logger.info('main:: ok.');
//     LoggerService.logger.info('main:: Connect to the Device.');
//     let dictDeviceChar:any = await device.connect(peripheral);
//     LoggerService.logger.info('main:: ok.');
//     dictDeviceChar['notify_tx2'].subscribe(function (buffer:Buffer) {
//         // data extraction
//     }
//    */
  
//   public static readonly uuidSendCmd:string =          '6e400004b5a3f393e0a9e50e24dcca9e';
//   public static readonly uuidReceivedResponse:string = '6e400005b5a3f393e0a9e50e24dcca9e';
//   public static readonly uuidReceivedECGData:string =  '6e400007b5a3f393e0a9e50e24dcca9e';
//   public static readonly uuidReceivedLog:string =      '6e40000bb5a3f393e0a9e50e24dcca9e';
//   public static readonly strCmdStart:string = '0100';
//   public static readonly strCmdStop:string = '0200';
//   public static readonly DEFAULT_SAMPLE_RATE:number = 300;

  
//   private divisor:number = 1;
//   private sampleRate:number = DeviceEcgW12.DEFAULT_SAMPLE_RATE;

//   public constructor(){
//       super();

//   }

  

//   public startECGData():boolean{
//     if (this.dictInfo == null) {
//       LoggerService.logger.error('[startECGData] this.dictInfo == null. Device does not connect?');
//       return false;
//     }
//     UtilBle.sendCmd(this.dictInfo['cmd_rx1'], DeviceEcgW12.strCmdStart);
//     return true;
//   }

//   public stopECGData():boolean{
//     if (this.dictInfo == null) {
//       LoggerService.logger.error('[stopECGData] this.dictInfo == null. Device does not connect?');
//       return false;
//     }
//     UtilBle.sendCmd(this.dictInfo['cmd_rx1'], DeviceEcgW12.strCmdStop);
//     return true;
//   }

//   public async test_getCharacteristics(peripheral){
//     let ret_characteristics:Array<Characteristic> = await this.__getCharacteristics(peripheral, new Array(1, 2, 3, 4, 5));
//     assert(ret_characteristics[0].uuid == '6e400004b5a3f393e0a9e50e24dcca9e');
//     assert(ret_characteristics[1].uuid == '6e400005b5a3f393e0a9e50e24dcca9e');
//   }

  

  
// }




