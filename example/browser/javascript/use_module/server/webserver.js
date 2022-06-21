const http = require("http");
const https = require("https");
const fs = require("fs");

const serve = require('koa-static')
const Koa = require('koa');
const path = require('path')
const app = new Koa();

console.log('__dirname = ' + __dirname);
app.use(serve(path.join(__dirname, '/public')))

// http.createServer(app.callback()).listen(3000);
// console.log('http, listening on port 3000');

const options = {
key: fs.readFileSync("./server.key", "utf8"),
cert: fs.readFileSync("./server.crt", "utf8")
};
https.createServer(options, app.callback()).listen(3001);
console.log('https, listening on port 3001');
