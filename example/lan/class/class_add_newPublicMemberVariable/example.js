
class publicMemberTestClass {
  addNewPublicMemberVariable(){
    this.newPublicMemberVariable = 123;   // this will add a new public member variable to your "object"
  }

  // define a public member method
  print(strTitle) {
    console.log(strTitle, this);
  }

  // define a private member method
}

// Test public member TestClass
let myTest1 = new publicMemberTestClass();
myTest1.addNewPublicMemberVariable();   // add a new member variable to myTest1 instance
myTest1.print("myTest1");

let myTest2 = new publicMemberTestClass();
myTest2.print("myTest2");               // for another instance, myTest2, there is no newPublicMemberVariable
