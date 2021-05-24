
const { networkInterfaces } = require('os');

export default class UtilNet {
    static getNetworkAdapterNames():{lstStrName:Array<string>, bOk:boolean, strMsg:string}{
        const nets = networkInterfaces();
        const lstStrAdapterName:Array<string> = [];
        for (const strName of Object.keys(nets)) {
            lstStrAdapterName.push(strName);
        }
        return {lstStrName:lstStrAdapterName, bOk:true, strMsg:'ok'}
    }

    static getIP():{lstIpObj:any, bOk:boolean, strMsg:string}{
        const nets = networkInterfaces();
        const lstIpObj = Object.create(null); // or just '{}', an empty object
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!lstIpObj[name]) {
                        lstIpObj[name] = [];
                    }
                    lstIpObj[name].push(net.address);
                }
            }
        }
        return {lstIpObj:lstIpObj, bOk:true, strMsg:'ok'}
    }

    static getIPFirst():{strIp:string, bOk:boolean, strMsg:string}{
        const {lstStrName, bOk, strMsg} = UtilNet.getNetworkAdapterNames();
        for(let i = 0; lstStrName.length; i++){
            if(lstStrName[i] === 'lo'){
                continue;
            }
            const {lstIpObj, bOk, strMsg} = this.getIP();
            if (!bOk){
                return {strIp:'n/a', bOk:false, strMsg:strMsg};
            }
            return {strIp:lstIpObj[lstStrName[i]], bOk:true, strMsg:'ok'};
        }
        return {strIp:'n/a', bOk:false, strMsg:'[Error] No IP found.'};
    }
}

