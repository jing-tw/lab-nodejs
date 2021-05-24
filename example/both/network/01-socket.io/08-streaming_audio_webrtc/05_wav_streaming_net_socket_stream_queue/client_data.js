var net = require('net');
var fs = require('fs');

var TestStreamWAVFile = require('./test/unit/teststreamwavfile');

var client = new net.Socket();


function testWriteBinaryData(client){
	const buf = Buffer.alloc(5, 'a');
	client.write(buf);
	console.log('client write ', buf);
}

function test_queue_16bit_8k_client(){
	// Test send wave stream (10ms chunk)
	var tester = new TestStreamWAVFile({socketClient:client, 
		strFullFilename: '../sample_audio/ImperialMarch60_mono_signed_16bit_pcm_8k.wav',
		sampleRate: 8000,
	});
	tester.start()
}

function test_queue_16bit_22k_client(){
	// Test send wave stream (10ms chunk)
	var tester = new TestStreamWAVFile({socketClient:client, 
		strFullFilename: '../sample_audio/ImperialMarch60_mono_signed_16bit_pcm_22k.wav',
		sampleRate: 22000,
	});
	tester.start()
}

client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	// client.write('Hello, server! Love, Client.'); // Test send text data
	// testWriteBinaryData(client); // Test send binary data
	test_queue_16bit_8k_client();
	// test_queue_16bit_22k_client();
});

client.on('data', function(data) {
	console.log('Client Received: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});