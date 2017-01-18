var assert = require('assert'),
    tester_a = {
      val : 'a'
    },

    tester_b = {
      val : 'b'
    };

assert.equal(tester_a.val, 'a');  // PASS
assert.equal(tester_b.val, 'b');  // PASS

console.log("False Test");
assert.equal(tester_a.val, 'b');  // Exception
