import UtilNet from '../UtilNet'

export class Test_UtilNet {
    static main(){
        test('test getNetworkAdapterNames', () => {
            expect(Test_UtilNet.testGetNetworkAdapterNames()).toBe(true);
          });

        test('test GetIP', () => {
            expect(Test_UtilNet.testGetIP()).toBe(true);
          });

        test('test GetIPFirst', () => {
            expect(Test_UtilNet.testGetIPFirst()).toBe(true);
        });
    }

    static testGetIP():boolean{
        const {lstIpObj, bOk, strMsg} = UtilNet.getIP();
        if (!bOk){
            console.trace(strMsg);
            return false;
        }
        console.log('lstIpObj = ', lstIpObj);
        console.log('result[\'enp0s31f6\'] = ', lstIpObj['enp0s31f6']);
        return true;
    }

    static testGetNetworkAdapterNames():boolean{
        const {lstStrName, bOk, strMsg} = UtilNet.getNetworkAdapterNames();
        if (!bOk){
            console.trace(strMsg)
            return false;
        }
        console.log('lstName = ', lstStrName);
        return true;
    }

    static testGetIPFirst():boolean{
        console.log('[Test] Run testGetIPFirst');

        let {strIp, bOk, strMsg} = UtilNet.getIPFirst();
        if (!bOk){
            console.trace(strMsg);
            return false;
        }
        console.log('strIp = ', strIp, ' bOk = ', bOk, ' strMsg = ', strMsg);
        return true;
    }
}

function main(){
    Test_UtilNet.main();
}

main();