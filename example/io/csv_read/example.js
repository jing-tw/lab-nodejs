var fs = require('fs');
var parse = require('csv-parse');

// Define a function that print out the data
var parser = parse({delimiter: ','}, function(err, data){
     console.log("data="+data);              // print the array object
     console.log("data[0]="+data[0]);        // print the row0 dataset
     console.log("data[0][0]="+data[0][0]);  // print the value of row0 and col0
     console.log("data[0][1]="+data[0][1]);

});

// Read the csv file and echo out to the parser
fs.createReadStream('my_file.csv').pipe(parser);

