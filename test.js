var Pipeline = require("./nodepipe");
var assert = require("assert");

function simpleTest(){
    var target = "x";

    var p = Pipeline.makePipe();
    p.addHandler(
        {incoming:function(ctx,evt){
                    target = evt;
                    ctx.forward(evt+evt);
                   }
        });
    p.addHandler(
        {incoming:function(ctx,evt){ target = evt; }});

    p.pushIncoming("yo");
    
    assert.equal(target,"yoyo");
}

simpleTest();
