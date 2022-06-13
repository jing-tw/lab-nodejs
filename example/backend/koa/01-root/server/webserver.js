const serve = require('koa-static')
const Koa = require('koa');
const path = require('path')
const app = new Koa();

console.log('__dirname = ' + __dirname);
// app.use(serve('./public'));
app.use(serve(path.join(__dirname, '/public')))

app.listen(3000);

console.log('listening on port 3000');
