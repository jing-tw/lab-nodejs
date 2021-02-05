import {Characteristic, Peripheral, Service } from '@abandonware/noble';

import DeviceBle from './DeviceBle'
import {UtilBle} from './UtilBle';
import LoggerService from './LoggerService'

export default class Test_DeviceBle {
    public static async test_discovery(){
        let strUUIDService = '80015abc6e5311e4b116123b93f75cba';// '80015ABC6E5311E4B116123B93F75CBA';
        let device:DeviceBle = new DeviceBle();
        let peripheral:Peripheral = await device.discovery(strUUIDService);
        UtilBle.printBLEPeripheral(peripheral);
    }
}

function main(){
    LoggerService.init();
    Test_DeviceBle.test_discovery();
}

main()