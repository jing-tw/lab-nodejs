(() => {
    'use strict';
    class myClass {
        constructor() {
          document.writeln("myClass::constructor");
        }

        print(){
            document.writeln("myClass::print");
        }
    }

    function g_funAbc(){
        document.writeln("global fun:g_funAbc()");
    }

    window.g_myClassObj = new myClass();
    window.g_funAbc = g_funAbc;

   })()

// (function() {
//     'use strict';
//     class myClass {
//         constructor() {
//           document.writeln("myClass::constructor");
//         }

//         print(){
//             document.writeln("myClass::print");
//         }
//     }

//     function g_funAbc(){
//         document.writeln("global fun:g_funAbc()");
//     }

//     window.g_myClassObj = new myClass();
//     window.g_funAbc = g_funAbc;
// })();