import UtilNet from '../00-common-util/src/UtilNet'

function main(){
    const {lstIpObj, bOk, strMsg} = UtilNet.getIP();
    if (!bOk){
        console.trace(strMsg);
        return false;
    }
    console.log('lstIpObj = ', lstIpObj);
    console.log('result[\'enp0s31f6\'] = ', lstIpObj['enp0s31f6']);
    return true;
}

main();
