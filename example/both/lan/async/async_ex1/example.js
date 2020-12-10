'use strict';

// Return a Promise object that will be resolved with x after c  seconds.
function LongTimeTask(x, c) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, c);
  });
}

function main() {
  // Step 1: Run the first LongTimeTask which takes 4 seconds
  let xPromise1 = LongTimeTask("First", 4000);
  xPromise1.then(function (x) {
     console.log(x);
  });

  // Step 2: Run the second LongTimeTask whick takes 2 seconds
  let xPromise2 = LongTimeTask("Second", 1000);
  xPromise2.then(function (x) {
     console.log(x);
  });
 
  // Result:  
  // Second
  // First
  //
  // Step 3: Run sequencing asynchronous 
  let xPromise3 = LongTimeTask("Third_1", 4000);
  xPromise3.then(function (x) {
     // after 4 second
     console.log(x);
    
     return LongTimeTask("Thrid_2", 2000);
  }).then( v => {

     // run this after "Third"
     console.log(v);
  });
}


main();

