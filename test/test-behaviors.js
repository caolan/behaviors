var behaviors = require('behaviors');


var behavior = {
    id: [String, Number],
    name: String,
    fn: Function
};

exports.testImplemented = function(test){
    var testmodule = {
        id: 123,
        name: 'name',
        fn: function(){return 'test';}
    };
    test.equals(
        behaviors.test(testmodule, behavior), true,
        'test module implements behavior'
    );
    test.done();
};

exports.testImplemented2 = function(test){
    var testmodule = {
        id: 'id',
        name: 'name',
        fn: function(){return 'test';}
    };
    test.equals(
        behaviors.test(testmodule, behavior), true,
        'behavior also accepts id as a string'
    );
    test.done();
};

exports.testNotImplemented = function(test){
    var testmodule = {
        name: 'name',
        fn: function(){return 'test';}
    };
    try {
        behaviors.test(testmodule, behavior);
        test.ok(false, 'should throw error');
    }
    catch(e){
        test.ok(true, 'does not implement behavior - missing export');
    }
    test.done();
};

exports.testNotImplemented2 = function(test){
    var testmodule = {
        id: {},
        name: 'name',
        fn: function(){return 'test';}
    };
    try {
        behaviors.test(testmodule2, behavior);
        test.ok(false, 'should throw error');
    }
    catch(e){
        test.ok(true, 'does not implement behavior - id wrong type');

    }
    test.done();
};
