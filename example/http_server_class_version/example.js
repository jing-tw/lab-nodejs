class ServerClass {
  constructor(){
    this.port = 2012;
    this.http = require('http');
    this.server = null;

    this.mystatus = "OK";
  }

  createServer(){
    if(this.server == null){
      this.server=this.http.createServer(function(req,res){
      	res.writeHead(200,{'Content-type':'text/plain'});
	      res.end('Hello World');
	      console.log('guest visted');
      
        this.mystatus = "PASS";

      }); // end of http.createServer
    }
  }// end of member function

  run(){
    this.server.listen(this.port);
    console.log('Server is running');
  }
}

// Usage
let myServer1 = new ServerClass();
myServer1.createServer();
myServer1.run();

