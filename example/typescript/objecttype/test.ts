interface Status {
    id: number;
    msg: string;
}

function Test(){
    let mystatus:Status = {id: 123, msg:'this is the msg'};
    console.log('mystatus = ' + JSON.stringify(mystatus));
    for (var prop in mystatus) {
        if (mystatus.hasOwnProperty(prop)) {
            console.log('prop = ' + prop + ', value = ' + mystatus[prop as keyof Status]);
        }
    }
}

function getParamUrl(para:Status):string{
    var url = '?';
    let bFirst = false;

    for (var prop in para) {
        if (para.hasOwnProperty(prop)) {
            url += (bFirst ? '&' : '') + prop + "=" + para[prop as keyof Status];
        }
        bFirst = true;
    }

    return url;
}

function main(){
    Test();

    let statusPara:Status = {id: 123, msg:'this is the msg'};
    let url = getParamUrl(statusPara);
    console.log('url = ' + url);
}
main();
