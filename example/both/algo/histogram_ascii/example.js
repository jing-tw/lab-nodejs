var histogram = require('ascii-histogram');
var bytes = require('bytes');
 
var data = {
  cats: 6,
  ferrets: 15,
  dogs: 2,
  koalas: 0
};
 
console.log();
console.log(histogram(data));
