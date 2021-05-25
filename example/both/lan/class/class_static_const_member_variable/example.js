const port = 33;

class MyClass {
  static get port() {
    return port;
  }
}


function main(){
  console.log('static const member' , MyClass.port);   // print: 33
  MyClass.port = 45;

  console.log('static const member' , MyClass.port);   // print: 33

}

main();

