'use strict';
class myClass {
    constructor() {
        console.log("my_module::myClass::constructor");
    }

    print() {
        console.log("my_module::myClass::print");
    }
}

function myFunAbc() {
    console.log("my_module::myFunAbc()");
}

export {myClass, myFunAbc}