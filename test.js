var Pipeline = require("./nodepipe");
var assert = require("assert");

function multipleHandlers(){
    var target = "x";

    var p = Pipeline.makePipe();
    p.addHandler(
        {incoming:function(ctx,evt){
                    target = evt;
                    ctx.forward(evt+evt);
                   },
            description: "first"
        });
    p.addHandler(
        {incoming:function(ctx,evt){ target = evt; },
            description: "second"
        });

    p.pushIncoming("yo");
    
    assert.equal(p.toString(),"first,second");
}

function propagateForwardIncomingHandlers(){
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

function propagateReverseOutgoingHandlers(){
    var target = "x";

    var p = Pipeline.makePipe();
    p.addHandler(
        {outgoing:function(ctx,evt){
                    target = evt;
                   }
        });
    p.addHandler(
        {outgoing:function(ctx,evt){ 
                    target = evt; 
                    ctx.forward(evt+evt);
                  }
        });

    p.pushOutgoing("yo");
    
    assert.equal(target,"yoyo");
}

multipleHandlers();
propagateForwardIncomingHandlers();
propagateReverseOutgoingHandlers();
