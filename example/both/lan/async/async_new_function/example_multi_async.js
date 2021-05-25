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

// no Promise testing
const task1 = function (strTitle) { 
   setTimeout(function() {console.log(strTitle + "task 1");}, 3000);
}

// no Promise testing
const task2 = function (strTitle ) {
   setTimeout(function() {console.log(strTitle + "task 2");}, 100);
}


async function timer (strTitle) {  
  console.log(strTitle + " timer started")
  await Promise.resolve(timeout(strTitle + "Async Task 1 ", 100));
  task1(strTitle);
  await Promise.resolve(timeout(strTitle + "Async Task 2", 10));
  task2(strTitle);
  console.log('timer finished')
}

function timer_main () {  
	timer("timer 1");  // timer 1 slot: Async Task 1 -> Async Task 2  and task 1 & task 2 async
	timer("timer 2");  // timer 2 slot: Asyn Task 1 -> Async and Task 1 & task 2 async

}


timer_main()

