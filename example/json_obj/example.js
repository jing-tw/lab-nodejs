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
  // save to json
  let obj = new MyClass("Jing", "1234");
  console.log("Json" + obj.toJson());
  
  let obj2 = new MyClass("Tom", "57");
  console.log("Json" + obj2.toJson());

  // restore
  let restoreObj = new MyClass(JSON.parse(obj.toJson()));
  restoreObj.print();
  
}

main();
