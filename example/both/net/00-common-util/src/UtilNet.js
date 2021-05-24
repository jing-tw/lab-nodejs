"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var networkInterfaces = require('os').networkInterfaces;
var UtilNet = /** @class */ (function () {
    function UtilNet() {
    }
    UtilNet.getNetworkAdapterNames = function () {
        var nets = networkInterfaces();
        var lstStrAdapterName = [];
        for (var _i = 0, _a = Object.keys(nets); _i < _a.length; _i++) {
            var strName = _a[_i];
            lstStrAdapterName.push(strName);
        }
        return { lstStrName: lstStrAdapterName, bOk: true, strMsg: 'ok' };
    };
    UtilNet.getIP = function () {
        var nets = networkInterfaces();
        var lstIpObj = Object.create(null); // or just '{}', an empty object
        for (var _i = 0, _a = Object.keys(nets); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            for (var _b = 0, _c = nets[name_1]; _b < _c.length; _b++) {
                var net = _c[_b];
                // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!lstIpObj[name_1]) {
                        lstIpObj[name_1] = [];
                    }
                    lstIpObj[name_1].push(net.address);
                }
            }
        }
        return { lstIpObj: lstIpObj, bOk: true, strMsg: 'ok' };
    };
    UtilNet.getIPFirst = function () {
        var _a = UtilNet.getNetworkAdapterNames(), lstStrName = _a.lstStrName, bOk = _a.bOk, strMsg = _a.strMsg;
        for (var i = 0; lstStrName.length; i++) {
            if (lstStrName[i] === 'lo') {
                continue;
            }
            var _b = this.getIP(), lstIpObj = _b.lstIpObj, bOk_1 = _b.bOk, strMsg_1 = _b.strMsg;
            if (!bOk_1) {
                return { strIp: 'n/a', bOk: false, strMsg: strMsg_1 };
            }
            return { strIp: lstIpObj[lstStrName[i]], bOk: true, strMsg: 'ok' };
        }
        return { strIp: 'n/a', bOk: false, strMsg: '[Error] No IP found.' };
    };
    return UtilNet;
}());
exports.default = UtilNet;
