// == MQTT Publish Client Class ==

module.exports = class MQTTClientClass {
  constructor (strClientID) {
    mqtt = require('mqtt');
    this.strClientID = strClientID;
  }

  subscribe(strTopic) {
    console.log(" == subscribe == ");
    this.client.subscribe(strTopic);
  }
 
  onMessage(topic, message){
     console.log("MQTTClientClass");
     console.log(' === message ===');
     console.log(message.toString());
  }

  connectToBroker(brokerIP, brokerPort) {
    // console.log('== connectToBroker ==\n', this);
    this.client = this.mqtt.connect({
      port: brokerPort,
      host: brokerIP,
      clientId: this.strClientID,
      clean: false
    });

    // setup callback function
    this.client.on('connect', this.onConnect.bind(this));

    /*
    this.client.on('message', function(topic, message) {
      console.log(' === message ===');
      console.log(message.toString());
    }.bind(this));
    */
    
    this.client.on('message', this.onMessage.bind(this));

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

  onConnect(connect) {
    console.log('onConnect');
  };

  publishData(strTopic, strMessage){
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
} // end of class

