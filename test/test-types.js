var testType = require('behaviors').testType;


var doTest = function(obj, should_match){
    return function(test){
        var types = [
            Number, Array, String, Boolean, Object,
            Function, null, undefined
        ];
        types.forEach(function(t){
            test.ok(
                testType(obj, t) === (t === should_match),
                'testType(' + obj + ', ' +
                (t instanceof Function && typeof(t()) || t) + ')'
            );
        });
        test.done();
    };
};

exports.testNumber = doTest(1, Number);
exports.testArray = doTest([], Array);
exports.testString = doTest("test", String);
exports.testBoolean = doTest(false, Boolean);
exports.testObject = doTest({}, Object);
exports.testFunction = doTest(function(){return 'test';}, Function);
exports.testNull = doTest(null, null);
exports.testUndefined = doTest(undefined, undefined);
