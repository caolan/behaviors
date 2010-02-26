var testType = require('behaviors').testType,
    assert = require('assert');

var doTest = function(obj, should_match){
    var types = [
        Number, Array, String, Boolean, Object,
        Function, null, undefined
    ];
    types.forEach(function(t){
        assert.strictEqual(
            testType(obj, t), (t === should_match),
            'testType(' + obj + ', ' +
            (t instanceof Function && typeof(t()) || t) + ')'
        );
    });
};

doTest(1, Number);
doTest([], Array);
doTest("test", String);
doTest(false, Boolean);
doTest({}, Object);
doTest(function(){return 'test';}, Function);
doTest(null, null);
doTest(undefined, undefined);
