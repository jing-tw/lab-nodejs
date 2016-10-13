var fs = require('fs');
var parse = require('csv-parse');
var showhis = require('ascii-histogram');
// var showhis = require('bars')
var bytes = require('bytes');

// Define a function that print out the data
var parser = parse({delimiter: ','}, function(err, data_2d){
//     console.log("data=" + data_2d);              // print the array object
     console.log("data[0]="+ data_2d[0]);        // print the row0 dataset

     var col1 = data_2d.map(function(col,index) { return col[0]; });
 //    console.log("col3 = " + col3);
     histogram(col1);
});

// Read the csv file and echo out to the parser
fs.createReadStream('my_file.csv').pipe(parser);

function histogram(array){
    console.log("array = " + array);

    var his = new Array(20);
    for (i = 0; i < his.length; i++){
        his[i] = 0;
    }

    for (i = 0; i < array.length; i++){
         bin = ((-1) * array[i]) / 5;          
         bin = Math.floor(bin);
     //    console.log("array[" + i + "] = "+ array[i]);
     //    console.log("((-1) * array[i]) = " + ((-1) * array[i]));
     //	   console.log("bin = " + bin);
         his[bin] = his[bin] + 1;
    }

    console.log("his = " + his);
//    console.log(showhis(his,{ bar: '=', width: 40, sort: false} ));
} 

