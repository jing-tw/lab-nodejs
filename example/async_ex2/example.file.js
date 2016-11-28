let fs = require('fs');
function write(data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile("out.txt", data, function(err) {
        if (err) reject(err);
        else resolve(data);
    });
  });
}

async function writeAsync() {
  var a = write("hello");
  return await a;
}

writeAsync().then(v => {
  console.log(v);  // prints 60 after 2 seconds.
});

