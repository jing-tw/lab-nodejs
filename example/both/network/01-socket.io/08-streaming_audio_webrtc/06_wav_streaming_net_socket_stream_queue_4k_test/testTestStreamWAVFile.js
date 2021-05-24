var net = require('net');
var TestStreamWAVFile = require('./test/unit/teststreamwavfile');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');

	// Test send wave stream (10ms chunk)
	var tester = new TestStreamWAVFile({socket_client:client});
	tester.start()
});