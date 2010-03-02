Behaviors
=========

A (really) simple way to check a modules exports in node.js.

This module is useful for projects implementing a plugin-style API, where
warning the developer of missing or invalid exports is more friendly than
simply starting up a server and letting all hell break loose.

This approach is similar to behaviors in Erlang (hence the name), where
a module is checked for required callbacks at compile time. In this case,
we check a module when it is require()'d.


Usage
-----

An example behavior description module (it could also just be an object):

    exports.id = [Number, String];
    exports.name = [String, undefined];
    exports.init = Function;
    exports.reserved = undefined;

A module implementing this behavior MUST export an id of type Number or String,
and an init function. It MUST NOT export 'reserved' (unless it exports
undefined as its value). It MAY export name, which must be a string.

Using a behavior description:

    var behaviors = require('behaviors');
    var plugin_behavior = require('./behaviors/plugin_behavior');

    var plugin1 = behaviors.require('./plugins/plugin1', plugin_behavior);

In the above example, an exception will be thrown if plugin1 does not meet
the requirements defined in plugin_behavior. The exception message will show
some useful information on whether an expected property was the wrong type
or missing.


Supported Export Types
----------------------

* Boolean
* Function
* Number
* Object
* String
* null
* undefined


Tests
-----

To run the tests you'll need to get testrunner, which is a submodule in this
respository. This can be done by the following commands:

    git submodule init
    git submodule update

The tests can then be run by doing:

    node test.js
