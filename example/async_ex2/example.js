'use strict';

var fs = require('fs');


function write(strMessage, strFilename) {
  fs.writeFile(strFilename, strMessage, function(err) {
     if(err) {
       return console.log(err);
      }
      console.log("The file was saved!");
   });
}

function read(strFilename) {
  try {
    let data = fs.readFileSync(strFilename);
    console.log("read:: data = " + data);
  } catch (e){
    console.log("read:: error e = " + e);
  }
  
}

function main(){
  let strFilename = "out.txt";
  write("hello world", strFilename);
  read(strFilename);
}

main();
