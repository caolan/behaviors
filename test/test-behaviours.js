var behaviors = require('behaviors'),
    assert = require('assert');


var behavior = {
    id: [String, Number],
    name: String,
    fn: Function
};

var testmodule = {
    id: 123,
    name: 'name',
    fn: function(){return 'test';}
};
assert.strictEqual(
    behaviors.test(testmodule, behavior), true,
    'test module implements behavior'
);

var testmodule2 = {
    id: 'id',
    name: 'name',
    fn: function(){return 'test';}
};
assert.strictEqual(
    behaviors.test(testmodule2, behavior), true,
    'test module 2 also implements behavior'
);

var testmodule3 = {
    name: 'name',
    fn: function(){return 'test';}
};
assert.throws(
    behaviors.test(testmodule2, behavior), Error,
    'test module 3 does not implement behavior - missing export'
);

var testmodule3 = {
    id: {},
    name: 'name',
    fn: function(){return 'test';}
};
assert.throws(
    behaviors.test(testmodule2, behavior), Error,
    'test module 4 does not implement behavior - exported wrong type for id'
);
