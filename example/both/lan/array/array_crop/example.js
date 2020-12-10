// Crop Array
// Usage:
/*
// define a crop range in left, top, right (no include), bottom (no include)
var rect = {l:20,t:20,r:60,b:60};
var crop_2d=crop(array_2d, rect);
*/
function crop(array_2d, rect){
    var crop_array = [];
    for(var i = rect.l; i<rect.r; i++){
        crop_array[i-rect.l] = [];
        for(var j = rect.t; j<rect.b; j++){
            crop_array[i-rect.l][j-rect.t] = array_2d[i][j];
        }
    }
    return crop_array;
}

function main(){
    var array_2d = [ [1, 2, 3, 4],
                     [5, 6, 7, 8],
                     [9, 10, 11, 12],
                     [13, 14, 15, 16, 17]];

    console.log("array_2d = " + array_2d);
  
    var rec = {l:0, t:0, r:2, b:2};
    var crop_2d = crop(array_2d, rec);

    console.log("crop_2d = " + crop_2d); 
}

main();
