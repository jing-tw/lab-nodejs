import LoggerService from './LoggerService';

export default class BleSpp{
    lstAllSPPDevices(){
        var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
        btSerial.on('found', function(address:any, name:any) {
            LoggerService.logger.info('Checking...\n\taddress = ' + address + ' name = ' + name);
            btSerial.findSerialPortChannel(address, function(channel:any) {
            }, () => {
                LoggerService.logger.info('Found! support Device address = ' + address + ' name = ' + name);
            });
        });
        btSerial.inquire();  // Todo:: update status?
    }
}


