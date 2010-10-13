var Pipeline = require("./nodepipe");
var assert = require("assert");

var tests = {
    multipleHandlers: function () {
        var target = "x";

        var p = Pipeline.makePipe(null);
        p.addHandler({
            incoming: function (ctx, evt) {
                target = evt;
                ctx.sendNext(evt + evt);
            },
            description: "first"
        });
        p.addHandler({
            incoming: function (ctx, evt) {
                target = evt;
            },
            description: "second"
        });

        p.pushIncoming("yo");

        assert.equal(p.toString(), "first,second");
    },
    propagatesendNextIncomingHandlers: function () {
        var target = "x";

        var p = Pipeline.makePipe(null);
        p.addHandler({
            incoming: function (ctx, evt) {
                target = evt;
                ctx.sendNext(evt + evt);
            }
        });
        p.addHandler({
            incoming: function (ctx, evt) {
                target = evt;
            }
        });

        p.pushIncoming("yo");

        assert.equal(target, "yoyo");
    },
    propagateReverseOutgoingHandlers: function () {
        var target = "x";

        var p = Pipeline.makePipe(null);
        p.addHandler({
            outgoing: function (ctx, evt) {
                target = evt;
            }
        });
        p.addHandler({
            outgoing: function (ctx, evt) {
                target = evt;
                ctx.sendNext(evt + evt);
            }
        });

        p.pushOutgoing("yo");

        assert.equal(target, "yoyo");
    },
};






for (var testx in Object.keys(tests)) {
    if (true) {
        console.log("\n\n============Running " + Object.keys(tests)[testx]);
        tests[Object.keys(tests)[testx]].call();
    }
}
