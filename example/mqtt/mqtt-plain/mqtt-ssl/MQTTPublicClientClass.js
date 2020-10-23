// == MQTT Publish Client Class ==

module.exports = class MQTTPublicClientClass {
  constructor (strClientID) {
    this.mqtt = require('mqtt');
    this.strClientID = strClientID;
  }

  subscribe(strTopic) {
    console.log(" == subscribe == ");
    console.log('client id = ' + this.strClientID);
    console.log('topic = ' + strTopic);

    this.client.subscribe(strTopic);
  }
  
  publishData(strTopic, strMessage){
    console.log(' == publish == ');
    console.log('client id = ' + this.strClientID);
    console.log('topic = ' + strTopic);
    console.log('message = ' + strMessage);

    this.client.publish(strTopic, strMessage, {
      qos: 1,
      retain: false
      }, function(err) {
        if (err) {
          console.log(err);
        }
    });
  };

  connectToBroker(brokerIP, brokerPort) {
    console.log(' == connecting == ');
    console.log('client id = ' + this.strClientID);
    console.log('broker ip = ' + brokerIP);
    console.log('broker port = ' + brokerPort);

    // console.log('== connectToBroker ==\n', this);
    this.client = this.mqtt.connect({
      port: brokerPort,
      host: brokerIP,
      clientId: this.strClientID,
      clean: false,

      protocol: 'ssl',
      keyPth: 'client.key',
      certPath: 'client.crt',
      rejectUnauthorized: false,
      ca: ['ca.crt']
      

    });

    // setup callback function
    this.client.on('connect', this.onConnect.bind(this));
    this.client.on('message', function(topic, message) {
      console.log(' === message ===');
      console.log(message.toString());
    }.bind(this));

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

} // end of class

/*

// Public Method 

MQTTPublicClientClass.prototype.connectToBroker = function (brokerIP, brokerPort) {

  // console.log('== connectToBroker ==\n', this);

  

  this.client = this.mqtt.connect({

      port: brokerPort,

      host: brokerIP,

      clientId: this.strClientID,

      clean: false

  });



  // setup callback function

  this.client.on('connect', this.onConnect.bind(this));



  this.client.on('message', function(topic, message) {

    console.log(' === message ===');

    console.log(message.toString());

  }.bind(this));



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

    console.log('onConnect');

    

    //console.log('== onConnect ==\n', this);

    //this.publishData("myTopic_qos_1", "hello mqtt");

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
* 
*/
