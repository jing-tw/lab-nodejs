function main(){
  var myGenerator = sayHiAndBye();
  var retObj = myGenerator.next(); // hi
  console.log('myGenerator.next() = ', retObj);     // { value: 'hi', done: false } 
                                                    // value => the statement following the yield
                                                    // done  => whethor or not the generator has finished

  retObj = myGenerator.next(); // bye;
  console.log('myGenerator.next() = ', retObj); 

  retObj = myGenerator.next(); // bye;
  console.log('myGenerator.next() = ', retObj); 
}

function* sayHiAndBye(){   // this is a generator function
  var strHi = yield 'hi';   // generator will pause when it hits this point
//  console.log('strHi = ' + strHi);

  var strBye = yield 'bye';
  console.log('strHi = ' + strHi + ' strBye = ' + strBye);
}

main();
