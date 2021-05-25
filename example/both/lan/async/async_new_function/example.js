'use strict';

// app.js
const timeout = function (strMessage, delay) {  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(strMessage);
      resolve()
    }, delay)
  })
}

async function timer () {  
  console.log('timer started')
  await Promise.resolve(timeout("Task 1 ", 100));
  await Promise.resolve(timeout("Task 2", 10));
  console.log('timer finished')
}

timer()

/*
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

*/
