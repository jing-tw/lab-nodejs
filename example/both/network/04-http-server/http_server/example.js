var server,
	port=2012,
	http=require('http');
server=http.createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/plain'});
	res.end('Hello World');
	console.log('guest visted');
});

server.listen(port);
console.log('Server is running');

