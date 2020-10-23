var fs = require('fs');
var csv = require('fast-csv');

var ws = fs.createWriteStream("my.csv");

var Array_2D = [
  [1, 2],
  [3, 4],
  [5, 6]
];

csv
   .write(Array_2D).pipe(ws);
