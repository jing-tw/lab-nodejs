'use strict';

let fs = require('fs');
let path = require('path');


function main(){
  fs.readdir ('./', function(err, files) {
    for (let file of files) {
      console.log(file);
      if (path.extname(file) == 'gz') {
	      fs.unlink('./' + file);
      }
    }
  });
}


main();

