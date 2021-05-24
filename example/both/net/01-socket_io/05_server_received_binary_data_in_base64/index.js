'use strict';

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var Queue = require('tiny-queue');
var q = new Queue()


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (strMsg) => {
    console.log('message: ' + strMsg);

    if (strMsg == 'End'){
      var size = q.length;
      var i;
      for (i = 0; i < size; i++) {
        var retByteChunk = q.shift()

        // show chrunk content
        console.log(i.toString() + ' retByteChunk = ', retByteChunk)
        var j = 0;
        for(j = 0; j < retByteChunk.length; j++){
          console.log(j, 'retByteChunk[j] = ', retByteChunk[j]);
        }
        // end of content
      }
    }
  });

 

  socket.on('binary_data', (strMessage_Base64) => {
    console.log('strMessage_Base64: ', strMessage_Base64);
    let lstByteChunk = new Buffer (strMessage_Base64, 'base64');

    console.log('lstByteChunk: ', lstByteChunk);
    var i = 0;
    for(i = 0; i < lstByteChunk.length; i++){
      console.log(i, 'lstByteChunk[i] = ', lstByteChunk[i]);
    }
    q.push(lstByteChunk);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});