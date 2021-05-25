import LoggerService from './LoggerService';
const bluetooth = require('node-bluetooth');
//import bluetooth from 'node-bluetooth';

export default class BleSpp{
    // lstAllSPPDevices(){
    //     var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
    //     btSerial.on('found', function(address:any, name:any) {
    //         LoggerService.logger.info('Checking...\n\taddress = ' + address + ' name = ' + name);
    //         btSerial.findSerialPortChannel(address, function(channel:any) {
    //         }, () => {
    //             LoggerService.logger.info('Found! support Device address = ' + address + ' name = ' + name);
    //         });
    //     });
    //     btSerial.inquire();  // Todo:: update status?
    // }
    
    lstAllSPPDevices(){
        console.log('process.versions = ', process.versions);
        const device = new bluetooth.DeviceINQ();
        device.listPairedDevices(console.log);

        device
            .on('finished',  console.log.bind(console, 'finished'))
            .on('found',  (address:string, name:string) => {
                console.log('Found: ' + address + ' with name ' + name);
            }).scan()
    }
}

