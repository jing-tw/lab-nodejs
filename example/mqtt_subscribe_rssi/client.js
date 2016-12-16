let noble = require('noble');
let net = require('net');
let MQTTPublicClientClass = require('./MQTTPublicClientClass.js');


function main(){
  let ServerIP = null;
  let ServerPort = 1883;
  let strClientID = null;
  let strTopic = "myTopic_qos_1";
  
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
  // myPublishClient.publishData("myTopic_qos_1", "Hello World");
  
    // RSSI Part
const MAX_SAMPLE_COUNT = 500;
let sampleCount = 0;

noble.on('stateChange', function(state) {
    if (state === 'poweredOn'){
      noble.startScanning([], true);
      console.log("noble start scanning");
    }
    else
      noble.stopScanning();
  });
  
noble.on('discover', function(peripheral) {
    if(sampleCount >= MAX_SAMPLE_COUNT){
      console.log("stopScanning");
      noble.stopScanning();
    }else{
      console.log("discovered");
      var macAdress = peripheral.uuid;
      var rss = peripheral.rssi;
      
      let strRSSIValue = "" + rss;
      
      myPublishClient.publishData(strTopic, strRSSIValue);    // PublishRSSIValue(client, strRSSIValue);
      console.log("strRSSIValue = " + strRSSIValue);
      /*
     if(peripheral.uuid == addressToTrack){
        console.log("Client No. " + PORT +  ' sampleCount = ' + sampleCount + " rss = " + rss); 
        console.log('found device: ', macAdress, ' sampleCount = ' + sampleCount , rss);
        client.write(''+rss);
      }
     */
    sampleCount++;
  }
  });
}

main();







