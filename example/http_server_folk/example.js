var cp = require('child_process'),
    cp1 = cp.fork('child2.js'),
    http = require('http');


var server=http.createServer();

server.on('request', function(req,res){
	res.writeHead(200,{'Content-type':'text/plain'});
	res.end('handled by parent\n');
	console.log('parent');
});

server.on('listening', function () {
  console.log('Server is on listening');
  cp1.send('server', server);
});

server.listen(3000);
console.log('Server is running');

