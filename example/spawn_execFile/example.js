var execfile = require('child_process').execFile;
var child = execfile('./app', function(error, stdout, stderr) {
  if ( error == null) {
    console.log('stdout: ' + stdout);
  }
});


