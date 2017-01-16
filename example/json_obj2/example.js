class BrokerClass{
  constructor(strIP, intPort) {
    this._strIP = strIP;
    this._intPort = intPort;
  }
}

class MessageClass{
  constructor(objPayload) {
    this._messageiD = 1;
    this._data = objPayload;
    this._expiredtime = 2
  }
  
  print(){
    console.log("print");
  }
}

function main() {
  // Create Objects
  let objBroker = new BrokerClass('192.168.1.10', 1234);
  var objMessage = new MessageClass(objBroker);
  
  console.log('JSON String = ' + JSON.stringify(objMessage)); // get the json string
  
  // Restore Objects
  let strJson = JSON.stringify(objMessage);
  let restoreObj2 = JSON.parse(strJson);
  
  console.log('restoreObj2._messageiD = ' + restoreObj2._messageiD);
  console.log('restoreObj2._data = ' + restoreObj2._data._strIP);
  restoreObj2.__proto__ = MessageClass.prototype;
  restoreObj2.print();
  
}

main();
