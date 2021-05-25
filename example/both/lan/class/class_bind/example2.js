class ABCClass {

  constructor(){
    this.public_mystatus = "OK";   // add a new public member variable

    this.port = 2012;
    this.http = require('http');
    this.server = null;
  }

  createServer(){
    if(this.server == null){
      this.server = this.http.createServer( function(req, res) {
      	res.writeHead(200,{'Content-type':'text/plain'});
	      res.end('Hello World');
	      console.log('guest visted');
        console.log('this.public_mystatus ', this.public_mystatus); // reference parent's member
      }.bind(this)); 
      this.mystatus = "PASS";
    }
  }

  run(){
    this.server.listen(this.port);
    console.log('Server is running');
  }
}


// Usage
let myABC = new ABCClass();
myABC.createServer();
myABC.run();


