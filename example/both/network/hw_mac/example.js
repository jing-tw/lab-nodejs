function main(){
  let getmac = require('getmac');

  getmac.getMac((err, macAddress) => {
    if(err) throw err;
    console.log(macAddress);
  });
}

main();
