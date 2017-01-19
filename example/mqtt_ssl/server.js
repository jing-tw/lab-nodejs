var mosca = require('mosca');

var SECURE_KEY = 'broker.key';
var SECURE_CERT = 'broker.crt';

var moscaSettings = {
//  port: 1883,
//  port: 8443,
  
  logger: {
    name: "secureExample",
    level: 40,
  },
  
  secure : {
    // port: 8443,
    port: 8883,
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
  }
  
};



var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected : ', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published : ', packet.payload.toString('utf8'));
    // console.log('Published : client', client);
});

server.on('subscribed', function(topic, client) {
    console.log("Subscribed : ", topic);
});

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}


