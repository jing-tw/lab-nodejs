'use strict';

var os = require('os');


function main(){
  console.log(os.freemem());
  console.log(os.loadavg());
  console.log(os.totalmem());
  console.log(os.cpus());
}

main();
