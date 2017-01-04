class MyClass{
  constructor(strName, intAge) {
    this._strName = strName;
    this._intAge = intAge;
  }

  toJson(){
    return JSON.stringify({"_strName":this._strName, "_intAge":this._intAge});
  }

  print(){
    console.log("print");
  }
}

function main() {
  // Create objects
  let obj = new MyClass("Jing", "1234");
  console.log("Json" + obj.toJson());
  
  let obj2 = new MyClass("Tom", "57");
  console.log("Json" + obj2.toJson());


  // Restore object
  let restoreObj2 = JSON.parse(obj.toJson());
  restoreObj2.__proto__ = MyClass.prototype;
  console.log('restoreObj2 = ',  restoreObj2);
  console.log('restoreObj2._strName = ' + restoreObj2._strName);
  
}

main();
