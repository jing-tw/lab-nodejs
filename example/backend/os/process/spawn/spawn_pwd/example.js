var spawn = require('child_process').spawn

var pwd = spawn('pwd');

pwd.stdout.on('data', function (data) {
  console.log(" == Normal Invoke == ");
  console.log('stdout: ' + data);
});

pwd.stderr.on('data', function (data) {
  console.error('stderr: ' + data);
});

pwd.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

var spawn2 = require('child_process').spawn
var pwd_arg = spawn2('pwd', ['--version']);
pwd_arg.stdout.on('data', function (data){
  console.log(" == Pass Argument Demo == ");
  console.log('pwd_arg stdout: ' + data);
});
