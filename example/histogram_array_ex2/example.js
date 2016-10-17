var fs = require('fs');
var parse = require('csv-parse');
var showhis = require('ascii-histogram');
// var showhis = require('bars')
var bytes = require('bytes');

// Define a function that print out the data
var parser = parse({delimiter: ','}, function(err, data_2d){
//     console.log("data=" + data_2d);              // print the array object
//     console.log("data[0]="+ data_2d[0]);        // print the row0 dataset

     var distance_array = new Array(20);
     for (var i = 0; i < distance_array.length; i++){
        // Get the 100 samples per distance
        var sample_set = data_2d.map(function(col,index) { return col[i]; });
        // if ( i == 0) console.log("sample_set =" + sample_set);
 
        // Get the RSSI distribution
        var his=histogram(sample_set);
        //if ( i == 0) console.log("his = " + his);
        distance_array[i]=his;
    }
    
    console.log("RSSI distribution per distance (0 ~ 10m)");
    for (var i = 0; i < distance_array.length; i++){
       // if ( i == 0) console.log("distance_array[" + i + "] ="+ distance_array[i]);
    }

    console.log("RSSI Index [0] [0.5m] [1m] [1.5m] [2m] [2.5m] ... [10m]");
    var rssi_array = new Array(100/5);
    for (var i = 0; i < rssi_array.length; i++){
        rssi_array[i] = distance_array.map(function(col,index) { return col[i]; });
        console.log("rssi_" + i + "= " + rssi_array[i]);
    }
});

// Read the csv file and echo out to the parser
fs.createReadStream('my_file.csv').pipe(parser);

function histogram(array){
    var his = new Array(100/5);

    for (var i = 0; i < his.length; i++){
        his[i] = 0;
    }

    for (var i = 0; i < array.length; i++){
         bin = ((-1) * array[i]) / 5;          
         bin = Math.floor(bin);
         his[bin] = his[bin] + 1;
        // if (bin == 5 ) console.log("bin =2 "+array[i])
    }

    return his;
} 

