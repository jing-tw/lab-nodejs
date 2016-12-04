let fs = require('fs');
let zlib = require('zlib'); // https://nodejs.org/api/zlib.html#zlib_zlib 

function main(){
  let gzip = zlib.createGzip(); 

  let inp = fs.createReadStream('example.html');
  let out = fs.createWriteStream('example.html.gz');

  inp.pipe(gzip).pipe(out);
}

main();
