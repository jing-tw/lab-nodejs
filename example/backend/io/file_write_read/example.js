let fs = require('fs');


function main(){
   fs.writeFile('./some.txt', '你要寫入的內容', function (err) {
     if (err) return console.error(err);
     fs.readFile('./some.txt', 'utf-8', function(data, err) {
       if(err) return console.error(err);
       console.log(data);
     });
   });
}


main();

