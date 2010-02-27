var behaviors = require('behaviors'),
    assert = require('assert');

var call_order = [];
var test_module = module.exports = {test: 'module'};
var test_behavior = {test: 'behavior'};

// copy behaviors.test
var test_copy = behaviors.test;


//---------- Module implements behavior ----------//
behaviors.test = function(m, b){
    assert.deepEqual(m, test_module, 'test called with module');
    assert.deepEqual(b, test_behavior, 'test called with behavior');
    call_order.push('test');
    return true;
};

var r = behaviors.require('./test/test-require', test_behavior);
assert.deepEqual(call_order, ['test'], 'correct call order');
assert.deepEqual(r, test_module, 'module returned ok');


//---------- Module does not implement behavior ----------//
behaviors.test = function(m, b){
    assert.deepEqual(m, test_module, 'test called with module');
    assert.deepEqual(b, test_behavior, 'test called with behavior');
    call_order.push('test');
    throw new Error('test');
};

call_order = [];
try {
    var r2 = behaviors.require('./test/test-require', test_behavior);
}
catch (e){
    assert.ok(e instanceof Error, 'throws error on invalid module');
    call_order.push('error');
}
assert.deepEqual(call_order, ['test', 'error'], 'correct call order');
assert.strictEqual(r2, undefined, 'module not returned');


// restore behaviors.test
behaviors.test = test_copy;
