exports.testType = function(prop, t){
    if(t === Number || t === String || t === Boolean || t === Function){
        return typeof prop === typeof t();
    }
    else if(t === Object){
        return (
            prop instanceof Object
            && !(prop instanceof Array)
            && !(prop instanceof Function)
        );
    }
    else if(t === null || t === undefined){
        return prop === t;
    }
    return prop instanceof t;
};

exports.test = function(obj, behavior){
    Object.keys(behavior).forEach(function(k){
        var expects = behavior[k];
        var prop = obj[k];
        var types = (expects instanceof Array) ? expects: [expects];
        var match = types.some(function(t){
            return exports.testType(prop, t);
        });
        if(!match){
            if(prop === undefined){
                throw new Error(k + ' is required');
            }
            else {
                var expected_types = types.map(function(t){
                    return typeof t();
                });
                throw new Error(
                    k + ' is of type ' + (typeof prop) + ', ' +
                    'expected: ' + expected_types
                );
            }
        }
    });
    return true;
};

exports.require = function(modulename, behavior){
    var m = require(modulename);
    exports.test(m, behavior);
    return m;
};
