import LoggerService from './LoggerService';
import BleSpp from './BleSpp';

class Test_BleSpp{
    static test_lstAllSPPDevices(){
        LoggerService.logger.info('test_lstAllSPPDevices\nPlease power on the devices.');
        let sppObj:BleSpp = new BleSpp();
        sppObj.lstAllSPPDevices();
    }
}

LoggerService.init();
Test_BleSpp.test_lstAllSPPDevices();