class ABCClass {

  constructor(){
    this.public_mystatus = "OK";   // add a new public member variable
    this.port = 2012;
    this.http = require('http');
    this.server = null;
  }

  createABC(){
    if(this.server == null){
     // console.log("this (in member function) = ", this);
      this.server=this.http.createServer(function(req,res){
      	res.writeHead(200,{'Content-type':'text/plain'});
	      res.end('Hello World');
	      console.log('guest visted');
        console.log(' == in Server:: Request callback function == \n', this);

        // WARNING: Current "this" reference to the Server object
        // Verification
        console.log(' == in Server:: Request callback function == \n', this);
        // this.public_mystatus = "PASS";   // This code will add a public_mystatus member variable to the  You cannot access the ABCClass object's public member


        console.log('this.myParent.mystatus = ' + this.myParent.mystatus);  // should print 'PASS'
      
      }); // end of http.createServer

      console.log(' == this.server (Before) ==\n', this.server);
      this.server.myParent = this;   // create a new member varible 'parent' 
      console.log(' == this.server (After) ==\n', this.server);

      this.mystatus = "PASS";
    }
  }// end of member function

  run(){
    this.server.listen(this.port);
    console.log('Server is running');
  }
}

class publicMemberTestClass {
  addNewPublicMemberVariable(){
    this.newPublicMemberVariable = 123;
  }

  print(strTitle) {
    console.log(strTitle, this);
  }
}

// Usage
// let myABC = new ABCClass();
// myABC.createABC();
//myABC.run();


// Test public member TestClass
let myTest1 = new publicMemberTestClass();
myTest1.addNewPublicMemberVariable();
myTest1.print("myTest1");

let myTest2 = new publicMemberTestClass();
myTest2.print("myTest2");
