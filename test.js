#!/usr/local/bin/node

var path = require('path');

require.paths.push(process.cwd());
require.paths.push(path.join(process.cwd(), 'deps'));
require.paths.push(path.join(process.cwd(), 'lib'));

try {
    var testrunner = require('nodeunit').testrunner;
}
catch (e){
    var sys = require('sys');
    sys.puts("Cannot find testrunner module.");
    sys.puts("You can download submodules for this project by doing:");
    sys.puts("");
    sys.puts("    git submodule init");
    sys.puts("    git submodule update");
    sys.puts("");
    process.exit();
}

testrunner.run(['test']);
