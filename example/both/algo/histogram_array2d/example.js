var fs = require('fs');
var parse = require('csv-parse');

// Usage
/*
     var bin_array = [1, 2, 3, 4, 5];
     var his = new Array(bin_array.length + 1);
     histogram_2d(array_2d, bin_array, his);
*/
function histogram_2d(array_2d, bin_array, retHis){

    for (var i = 0; i < retHis.length; i++){
        retHis[i] = 0;
    }
   
    var count = 0;
    const SMALLEST = -9999;
    var left = SMALLEST, right = SMALLEST;
    for (var y =0; y < array_2d.length; y++){
        for (var x = 0; x < array_2d[0].length; x++){
            var data = array_2d[y][x];
            // get the bin
            left = SMALLEST, right = SMALLEST;
            for(var bi = 0; bi < bin_array.length; bi++){
                  right = bin_array[bi];
                  if ( data > left && data <= right){
                         retHis[bi] ++;
                         break;
                  }
                  left = right;
            }

            // 
            if( data >= -1 && data <= 1)
               count ++;
        }
    }

    console.log("count = " + count);

    right = bin_array[bin_array.length-1];
    for (var y =0; y < array_2d.length; y++){
        for (var x = 0; x < array_2d[0].length; x++){
            var data = array_2d[y][x];
            if ( data > right ){
                 retHis[bin_array.length] ++;
            }
        }
     }
    
    console.log("retHis = " + retHis);
} 

var parser = parse({delimiter: ','}, function(err, data_2d){
     console.log("data=" + data_2d);              // print the array object
     console.log("data[0]="+ data_2d[0]);        // print the row0 dataset
   
/*  
     data_2d = [ [1, 1, 1],
                 [2, 2, 2],
                 [3, 3, 3]];
 */ 
     var bin_array = [1, 2, 3, 4, 5];
     var his = new Array(bin_array.length + 1)
     histogram_2d(data_2d, bin_array, his);
});

function main(){
   fs.createReadStream('my_file.csv').pipe(parser); 
}

main();
