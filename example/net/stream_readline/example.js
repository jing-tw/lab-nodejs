'use strict';

let readline = require('readline');

function main(){
  // create a new interface
  let rl = readline.createInterface(process.stdin, process.stdout);
 
  // ask question
  rl.question(">> What is the meaning of life? ", function(answer) {
    console.log("About the meaining of life, you said " + answer);
    rl.setPrompt(">> ");
    rl.prompt();
  });

  // function to close interface
  function closeInterface() {
    rl.close();
    console.log('Leaving Readline');
  }

  // listen for .leave
  rl.on('line', function(cmd) {
    if (cmd.trim() == '.leave') {
      closeInterface();
      return;
    }
    console.log('repeating command: ' + cmd);
    rl.prompt();
  });

  rl.on('close', function() {
    closeInterface();
  });
}


main();

