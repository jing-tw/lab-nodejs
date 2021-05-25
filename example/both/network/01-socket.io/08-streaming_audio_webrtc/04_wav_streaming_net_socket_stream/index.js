'use strict';

const bodyParser = require('body-parser');
const browserify = require('browserify-middleware');
const express = require('express');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const { mount } = require('./lib/server/rest/connectionsapi');
const WebRtcConnectionManager = require('./lib/server/connections/webrtcconnectionmanager');

const app = express();

app.use(bodyParser.json());

const examplesDirectory = join(__dirname, 'examples');

const examples = readdirSync(examplesDirectory).filter(path =>
  statSync(join(examplesDirectory, path)).isDirectory());


// 為目前 example 建立 connection manager 並且 設定 app routing
function setupExample(example) {
  const path = join(examplesDirectory, example);
  const clientPath = join(path, 'client.js');
  const serverPath = join(path, 'server.js');

  app.use(`/${example}/index.js`, browserify(clientPath)); // 設定 app 路徑 map: ${example}/index.js --> 目前example/client.js
  app.get(`/${example}/index.html`, (req, res) => {        // 設定 app 路徑 map: ${example}/index.html --> server位置/html/index.html
    res.sendFile(join(__dirname, 'html', 'index.html'));
  });

  const options = require(serverPath); // 引入目前 example 中 server.js 定義的 beforeOffer 模組
  const connectionManager = WebRtcConnectionManager.create(options); // 利用目前 example 的 beforeOffer 模組, 建立 connection manager
  mount(app, connectionManager, `/${example}`); // 設定 app 路徑 map: ${example}/connection --> 對應的 connection manager 連線物件

  return connectionManager;
}

// 第一個畫面, 直接導向第一個 example 的 index.html
app.get('/', (req, res) => res.redirect(`${examples[0]}/index.html`));

// 建立 connectionManagers Map 元件, 每一個 map entry 分別為 {key=example, value=connectionManger}
const connectionManagers = examples.reduce((connectionManagers, example) => {
  const connectionManager = setupExample(example); // 為每一個 example 建立 connection manager
  return connectionManagers.set(example, connectionManager); // 新增一個 map entry: {example: connecion manager}
}, new Map());

const server = app.listen(3000, () => {
  const address = server.address();
  console.log(`http://localhost:${address.port}\n`);

  server.once('close', () => {
    connectionManagers.forEach(connectionManager => connectionManager.close());
  });
});


// var app_data = express()

// const server2 = app_data.listen(3001, () => {
//   const address = server2.address();
//   console.log(`http://localhost:${address.port}\n`);


// });


var net = require('net');



// const server_data = net.createServer(function(socket) {
// 	socket.write('Echo server\r\n');
// 	socket.pipe(socket);
// });

const server_data = net.createServer();

server_data.on('connection',function(socket){
  console.log('a client connected.')
  var rport = socket.remotePort;
  var raddr = socket.remoteAddress;

  console.log('REMOTE Socket is listening at port' + rport);
  console.log('REMOTE Socket ip :' + raddr);

  socket.on('data',function(data){
    console.log('server_data:: received data = ', data);
  });
});

server_data.listen(1337, () => {
    const address = server_data.address();
    console.log(`http://localhost:${address.port}\n`);
  });


