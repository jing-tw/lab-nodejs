var myGenerator;

function main() {
  myGenerator = MyGeneratorFunction();            // Pause at first
  var retObj = myGenerator.next();                // start to run the MyGeneratorFunction
  console.log('myGenerator.next() = ', retObj);    
}

// Generator Function includes codes requiring to sync 
function* MyGeneratorFunction(){   
  yield doAsyncFn();              // Run doAsyncFn and then pause until next() was involded
  yield doAyncFnThatDependsOnA(); // Run doAyncFnThatDependsOnA and then pause until next() was involded
}

// Async Function
function doAsyncFn(){
  let fs = require('fs');
  console.log('run doAsyncFn()');

  strCode = "Hello World\n";
  fs.writeFile("out.txt", strCode, function(err) {
    if(err) {
      return console.log(err);
    }
      console.log("The file was saved!");
      var retObj = myGenerator.next();     // <-------------- resume to the next
      console.log('myGenerator.next() = ', retObj);
   });
}

// Any Function that depends on Async Function
function doAyncFnThatDependsOnA() {
  let fs = require("fs");

  fs.readFile('out.txt', function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
    var retObj = myGenerator.next();     // <-------------- resume to the next
    console.log('myGenerator.next() = ', retObj);
  });

}

main();

