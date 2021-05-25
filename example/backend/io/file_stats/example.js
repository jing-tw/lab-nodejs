let fs = require('fs');
let util = require('util');

function main(){
  fs.stat('example.html', function (err, stats) {
    if (err) return console.log(err);
    console.log(util.inspect(stats));
    console.log("stats = ", stats);
  });
}

main();
