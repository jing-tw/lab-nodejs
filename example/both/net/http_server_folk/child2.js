var http = require('http');

var server = http.createServer(function (req, res) {

  console.log('child got req');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hanled by child\n');
});

process.on('message', function (msg, httpServer) {
  if (msg === 'server'){
    console.log('child got message');

    // parent httpServer got connection, transfer handler to the child http server
    httpServer.on('connection', function (socket) {
      console.log('trannsfer to the child http server');
      server.emit('connection', socket); 
    });
  }
});
