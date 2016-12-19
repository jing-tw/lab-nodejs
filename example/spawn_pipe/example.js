var spawn = require('child_process').spawn

var find = spawn('find', ['.', '-ls']);
var grep = spawn('grep', ['test']);

grep.stdout.setEncoding('utf8');

// pipe find output to grep input
find.stdout.pipe(grep.stdin);

find.stdout.on('data', function (data) {
  console.log(" == find output == ");
  console.log('stdout: ' + data);
});

grep.stdout.on('data', function (data) {
  console.log(" == grep output ==");
  console.log(' stdout: ' + data);
});

find.stderr.on('data', function (data) {
  console.error('find stderr: ' + data);
});

grep.stderr.on('data', function (data) {
  console.error('grep stderr: ' + data);
});

find.on('close', function (code) {
  if (code !== 0 ) {
    console.log('child process exited with code ' + code);
  }
});

grep.on('exit', function (code) {
  if( code !== 0) {
    console.log('grep process exited with code ' + code);
  }
});

