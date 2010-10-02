var pipe = require('./nodepipe');
var assert = require('assert');

var tests = {
	simpleIncomingTest: function(){}
};

for (var testx in Object.keys(tests)) {
    if(true){
	    console.log("\n\n============Running " + Object.keys(tests)[testx]);
	    tests[Object.keys(tests)[testx]].call();
   }
}
