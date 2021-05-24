var net = require('net');
var fs = require('fs');

var TestStreamWAVFile = require('./test/unit/teststreamwavfile');

var client = new net.Socket();


function testWriteBinaryData(client){
	const buf = Buffer.alloc(5, 'a');
	client.write(buf);
	console.log('client write ', buf);
}

client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');

	// Test send binary data
	testWriteBinaryData(client);

	// Test send wave stream (10ms chunk)
	var tester = new TestStreamWAVFile({socketClient:client});
	tester.start()
});

client.on('data', function(data) {
	console.log('Client Received: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});