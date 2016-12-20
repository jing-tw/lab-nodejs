let MQTTClientClass = require('./MQTTClientClass.js');

function main(){
  let ServerIP = null;
  let ServerPort = 1883;
  let strClientID = null;
  
  if ( process.argv.length < 4){
    console.log("Usage:\n node client-sub:.js <mqtt server ip> <subscribe id");
    process.exit();
  }else{
    ServerIP = process.argv[2];    
    strClientID = process.argv[3];
    
    console.log('Server IP =' + ServerIP);
    console.log('strClientID = ' + strClientID);
  }

  // Usage
  let mySubScribeClient = new MQTTClientClass(strClientID);
  mySubScribeClient.connectToBroker(ServerIP, ServerPort);
  mySubScribeClient.subscribe("myTopic_qos_1");
}

main();




