var fs = require('fs');
var parse = require('csv-parse');

// Define a function that print out the data
var parser = parse({delimiter: ','}, function(err, data){
//     console.log("data="+data);              // print the array object
//     console.log("data[0]="+data[0]);        // print the row0 dataset
//     console.log("data[0][0]="+data[0][0]);  // print the value of row0 and col0
//     console.log("data[0][1]="+data[0][1]);

     // var Data = [ [1, 2, 3], 
     //            [4, 5, 6]];

     var strCode = "var Data = [\n";
     for (var y = 0; y < data.length; y++){
       strCode = strCode + "[";
       for (var x = 0; x < data[0].length; x++){
            if ( x < data[0].length - 1){
                strCode += data[y][x] + ",";
            }else {
                strCode += data[y][x] + "]";
            }
       }
       if (y < data.length -1)
            strCode += ",\n";
       else
            strCode += "];\n";
     }
      
     console.log("strCode = " + strCode);

     fs.writeFile("out_hardcode_array.js", strCode, function(err) {
         if(err) {
             return console.log(err);
         }

          console.log("The file was saved!");
     }); 
});

// Read the csv file and echo out to the parser
fs.createReadStream('my_file.csv').pipe(parser);

