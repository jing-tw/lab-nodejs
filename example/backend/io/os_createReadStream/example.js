let fs = require('fs');

function main(){
  var server,
	port=2012,
	http=require('http');

  server=http.createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/html'});
	console.log('guest visted');

        // create and pipe readable stream
        let file = fs.createReadStream("example.html");
        file.on("open", function() {
          file.pipe(res);
        });	
  });

  server.listen(port);
  console.log('Server is running');
}

main();
