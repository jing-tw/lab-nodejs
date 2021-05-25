var fs = require('fs');

// file is included here:
eval(fs.readFileSync('out_hardcode_array.js')+'');

console.log(Data);
