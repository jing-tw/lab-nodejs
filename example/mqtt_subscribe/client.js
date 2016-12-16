let MQTTPublicClientClass = require('./MQTTPublicClientClass.js');

function main(){
  let ServerIP = null;
  let ServerPort = 1883;
  let strClientID = null;
  
  if ( process.argv.length < 4){
    console.log("Usage:\n node client.js <mqtt broker ip> <publish client id>");
    process.exit();
  }else{
    ServerIP = process.argv[2]; 
    strClientID = process.argv[3];
  }

  // Usage
  let myPublishClient = new MQTTPublicClientClass(strClientID);
  myPublishClient.connectToBroker(ServerIP, ServerPort);
  myPublishClient.publishData("myTopic_qos_1", "Hello World");
}

main();



