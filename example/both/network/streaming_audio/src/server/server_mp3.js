var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io'); // 加入 Socket.IO

let intPort = 8001

var server = http.createServer(function(request, response){
  console.log('Connection');
  if (request.url === '/favicon.ico') {
    // Handle favicon.ico 404 not foud issue
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
    console.log('favicon requested');
  }else{
    var path = url.parse(request.url).pathname;

    switch (path) {
      case '/':
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Hello, World.');
        response.end();
        break;
      case '/socket_wav.html':
        fs.readFile(__dirname + path, function(error, data) {
          if (error){
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
          } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data, "utf8");
          }
          response.end();
        });
        break;

      default:
        response.writeHead(404);
        response.write("opps this doesn't exist - 404");
        response.end();
        break;
    }
   }
});

server.listen(intPort);
console.log('Server is listening on port: ' + intPort)
var serv_io = io.listen(server);
serv_io.sockets.on('connection', function(socket) {
  // let strAudiofile = 'LRMonoPhase4.mp3';
  let strAudiofile = 'signed_32bit_float_pcm_mono_8k.wav';
  fs.readFile(strAudiofile, function(error, byteBuffer){
    console.log(byteBuffer.length);
    socket.emit('data_wave', byteBuffer);
  });
});

