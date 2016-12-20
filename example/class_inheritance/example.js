// Private and privileged members can only be made when an object is constructed
// Public method cannot invoked private method
// You can use privilege method to access the public and privated members.
// The privileged method can be invoked from outside/public method
// 
class BaseClass1 {

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
    
    // privileged method
    this.myPrivilegedMethod = function () {
       console.log("myPrivilegedMethod");
       myPrivateMethod1();           // OK: You can access any public/private members from privilege method 
    };
  }

  // public method
  publicMethod(){
    console.log("public Method");
  }

  print(){
    console.log("BaseClass 1");
  }
}


class DerivedClass extends BaseClass1 {
  constructor(){
    super();
  }

  print(){
    console.log("DerivedClass");
  }
}

let obj = new DerivedClass();
obj.print();
