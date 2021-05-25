var fs = require('fs');
var parse = require('csv-parse');

// Define a function that print out the data
var parser = parse({delimiter: ','}, function(err, data_2d){
     console.log("data=" + data_2d);              // print the array object
     console.log("data[0]="+ data_2d[0]);        // print the row0 dataset

     var col3 = data_2d.map(function(col,index) { return col[2]; });
     console.log("col3 = " + col3);
});

// Read the csv file and echo out to the parser
fs.createReadStream('my_file.csv').pipe(parser);

