import net, {Socket} from 'net'
import config  = require('../config/dev');

let client:Socket = new net.Socket();

const address = config.machine.address;
const port = config.machine.port;

function sendBinary(client:Socket){
    const buf = Buffer.alloc(5, 'a');
    client.write(buf);
    console.log('client write ', buf);
}

client.connect(port, address, function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client.123 ');
    sendBinary(client);
});

client.on('data', function(data) {
    console.log('Client Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function() {
console.log('Connection closed');
});
