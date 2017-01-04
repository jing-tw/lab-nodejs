class MyClass{
  constructor(strName, intAge) {
    this._strName = strName;
    this._intAge = intAge;
  }

  toJson(){
    return JSON.stringify({"_strName":this._strName, "_intAge":this._intAge});
  }

  MethodTest(strMessage){
    console.log("MethodTest::" + strMessage);
  }
}

function main() {
  // Create two objects
  let obj = new MyClass("Jing", "1234");
  let obj2 = new MyClass("Tom", "57");

  console.log("Json" + obj.toJson());
  console.log("Json" + obj2.toJson());

  // Generate one single JSON string for these objects
  // [JSON] Single String
  let strJsonSingleString = '[' +  obj.toJson() + ',' + obj2.toJson() + ']';
  console.log('strJsonSingleString = ' + strJsonSingleString);

  // Restore the objects and test
  var Objs = JSON.parse(strJsonSingleString);
  console.log('objs = ' , Objs);
  for (let i = 0; i < Objs.length; i++) {
    Objs[i].__proto__ = MyClass.prototype
    console.log('Objs._strName =' + Objs[i]._strName);
  }
}

main();
