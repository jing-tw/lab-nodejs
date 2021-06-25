"use strict";
function Test() {
    var mystatus = { id: 123, msg: 'this is the msg' };
    console.log('mystatus = ' + JSON.stringify(mystatus));
    for (var prop in mystatus) {
        if (mystatus.hasOwnProperty(prop)) {
            console.log('prop = ' + prop + ', value = ' + mystatus[prop]);
        }
    }
}
function getParamUrl(para) {
    var url = '?';
    var bFirst = false;
    for (var prop in para) {
        if (para.hasOwnProperty(prop)) {
            url += (bFirst ? '&' : '') + prop + "=" + para[prop];
        }
        bFirst = true;
    }
    return url;
}
function main() {
    Test();
    var statusPara = { id: 123, msg: 'this is the msg' };
    var url = getParamUrl(statusPara);
    console.log('url = ' + url);
}
main();
