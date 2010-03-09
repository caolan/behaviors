var behaviors = require('behaviors');

var setup = function(fn){
    return function(test){
        // copy behaviors.test
        var test_copy = behaviors.test;
        var env = {
            behavior: {test:'behavior'},
            require_path: './test/test-require'
        };
        fn.call(env, test);
        // restore behaviors.test
        behaviors.test = test_copy;
    };
};


//---------- Module implements behavior ----------//
exports.implementsBehavior = setup(function(test){
    test.expect(3);
    var that = this;
    behaviors.test = function(m, b){
        test.same(m, exports, 'test called with module');
        test.same(b, that.behavior, 'test called with behavior');
        return true;
    };
    var r = behaviors.require('./test/test-require', this.behavior);
    test.same(r, exports, 'module returned ok');
    test.done();
});


//---------- Module does not implement behavior ----------//
exports.doesNotImplementBehavior = setup(function(test){
    test.expect(4);
    var that = this;
    behaviors.test = function(m, b){
        test.same(m, exports, 'test called with module');
        test.same(b, that.behavior, 'test called with behavior');
        throw new Error('test');
    };
    try {
        var r = behaviors.require(this.require_path, this.behavior);
    }
    catch (e){
        test.ok(e instanceof Error, 'throws error on invalid module');
    }
    test.equals(r, undefined, 'module not returned');
    test.done();
});
