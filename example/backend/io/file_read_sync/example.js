var fs = require("fs");

// Synchronous read
var data = fs.readFileSync('note.txt');
console.log("Synchronous read: " + data.toString());

console.log("End");
