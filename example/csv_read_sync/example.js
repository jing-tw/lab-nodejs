var util = require('util');
var parse = require('csv-parse/lib/sync');

function SimpleLineExample(){
  console.log("== SympleLineExample ==");

  var input = '"key_1","key_2"\n"value 1","value 2"';
  var records = parse(input, {columns: true});
 
  console.log(util.inspect(records, false, null));
  console.log("records.key_1 = " + records[0].key_1);
  console.log("records[0].key_2 = " + records[0].key_2);

  console.log(" ");
}

function ReadFileSyncExample(){
  var fs = require('fs');
  var content = fs.readFileSync('my_file.csv');
  console.log("== Read File Sync Example ==");
  console.log("content = " + content);

  var records = parse(content, {delimiter: ','});
  // console.log("util.inspect = " + util.inspect(records, false, null)); 
  for ( var i = 0; i < records.length; i ++) {
    console.log("i = " + i + " records[i] = " + records[i]);
  }


  console.log("records.length = " + records.length);
  console.log("records[0].length = " + records[0].length);
  console.log("records[1][1] = " + records[0][0]);
}


function main(){
  SimpleLineExample();
  ReadFileSyncExample();

  console.log("1");
  console.log("2");
  console.log("3");
}
main();

/*
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
*/
