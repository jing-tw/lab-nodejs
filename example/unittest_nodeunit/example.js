module.exports = {
    // 第一個測試
    'Test 1' : function(test) {
        test.expect(1);    // 一個 tester 執行
        test.ok(true, "This shouldn't fail");  // Assertion 1:  PASS
        test.done();       // 這個測試做完了
    },

    // 第二個測試
    'Test 2' : function(test) {
        test.expect(2);    // 兩個 tester 分別執行
        test.ok(1 === 1, "This shouldn't fail");    // Assertion 1: PASS
        test.ok(false, "This should fail");         // Assertion 2: Fail
        test.done();
    }
};

