// Private and privileged members can only be made when an object is constructed
// Public method cannot invoked private method
// You can use privilege method to access the public and privated members.
// The privileged method can be invoked from outside/public method
// 
class TestClass {

  // the constructor
  constructor(){
    // public variable
    this.myPublicVariable = 123;

    // private variable
    let myPrivateVariable = 123;    

    // private method
    function myPrivateMethod1(){
        myPrivateVariable = 567; //OK:  ONLY private method can access your private variable
    }
    
    // private method
    function myPrivateMethod2(){
        myPrivateMethod1();     // OK: you can access your private method from any private method
    }

    // privileged method
    this.myPrivilegedMethod = function () {
       console.log("myPrivilegedMethod");

       // access public method
       this.publicMethod2();         // OK: You can access any public/private members from privilege method

       // access private method
       myPrivateMethod1();           // OK: You can access any public/private members from privilege method 
    };
  }

  // public method
  publicMethod(){
    console.log("public Method");
    // myPrivateVariable = 567;      // Error: you cannot access the private variable in public method
    // myPrivateMethod1();           // Error: You cannot access private method in public method

    this.myPublicVariable = 567;     // OK: You can access public variable in public method
    this.myPrivilegedMethod();      // OK: You can access any privileged method from public method
  }

  publicMethod2(){
    console.log("public Method 2");
  }

}

// Test public member TestClass
let myTest1 = new TestClass();
myTest1.publicMethod();               // OK: You can access any public method from outside.
// myTest1.privateMethod1();          // Error: You cannot access private method from outside.
myTest1.myPrivilegedMethod();        // OK: You can access "privilegedMethod" from outside.
