'use strict';

var os = require('os');


function main(){
  console.log('Using end of line' + os.EOF + 'to insert a new line');
  console.log(os.endianness());
  console.log(os.tmpdir());
  console.log(os.homedir());
}

main();
