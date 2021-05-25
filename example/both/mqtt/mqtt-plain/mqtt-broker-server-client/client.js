let ServerIP = null;
let ServerPort = 1883;
if ( process.argv.length < 3){
    console.log("Usage:\n node client.js <mqtt server ip>");
    process.exit();
}else{
    ServerIP = process.argv[2];    
}

// == MQTT Publish Client Class ==
class MQTTPublicClientClass{
  constructor () {
    this.mqtt = require('mqtt');
  }
}

// Public Method 
MQTTPublicClientClass.prototype.connectToBroker = function (brokerIP, brokerPort) {
  // console.log('== connectToBroker ==\n', this);
  
  this.client = this.mqtt.connect({
      port: brokerPort,
      host: brokerIP,
      clientId: 'client_qos_1',
      clean: false
  });
    
  // setup callback function
  this.client.on('connect', this.onConnect.bind(this));

  this.client.on('reconnect', function() {
    console.log('===reconnect===');
  }.bind(this));

  this.client.on('close', function() {
    console.log('===close===');
  }.bind(this));

  this.client.on('offline', function() {
    console.log('===offline===');
  }.bind(this));

  this.client.on('error', function(error) {
    console.log('===error===');
  }.bind(this));
};

MQTTPublicClientClass.prototype.onConnect = function (connect) {
    console.log('onConnect : hello mqtt');
    
    //console.log('== onConnect ==\n', this);
    this.publishData("myTopic_qos_1", "hello mqtt");
};

MQTTPublicClientClass.prototype.publishData = function (strTopic, strMessage){
  console.log("publishData:: Send message: " + strMessage);
  
   this.client.publish(strTopic, strMessage, {
      qos: 1,
      retain: false
      }, function(err) {
        if (err) {
          console.log(err);
        }
    });
};


// Usage
let myPublishClient = new MQTTPublicClientClass();
myPublishClient.connectToBroker(ServerIP, ServerPort);
myPublishClient.publishData("myTopic_qos_1", "hello mqtt");

