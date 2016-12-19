var exec = require('child_process').exec;
var child = exec('./app', function(error, stdout, stderr) {
  if ( error == null) {
    console.log('stdout: ' + stdout);
  }
});


