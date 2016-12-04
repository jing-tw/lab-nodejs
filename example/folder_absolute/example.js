'use strict';

let fs = require('fs');
let path = require('path');


function main(){
  console.log('==== fold info == ');
  fs.readdir ('./', function(err, files) {
    for (let file of files) {
     let ext = path.extname(file);
     let base = path.basename(file, ext);
     let strFullFilename = path.resolve(file);
     console.log("path.resolve() = " + strFullFilename);
     console.log("path = " + path.dirname(strFullFilename));
     // console.log ('file ' + base + ' with extension of ' + ext);
    }
  });
}


main();

