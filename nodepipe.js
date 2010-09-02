function Node(handler){
                this.incoming = handler.incoming || function(ctx,event){ if(ctx.next){ctx.next(event)};};
                this.outgoing = handler.outgoing || function(ctx,event){ if(ctx.next){ctx.next(event)};};
                this.next = null;
                this.prev = null;
}

function Pipeline(){
                var self = this;
                this.first = null;
                this.last = null;
               
                this.addHandler = function(handler){
                                var node = new Node(handler);
                                if(self.first === null){
                                                self.first = node;
                                                self.last = node;
                                }
                                else{
                                                self.last.next = node;
                                                node.prev = self.last;
                                                self.last = node;
                                }
                };
                
                this.pushIncoming = function(evt){
                    self.first.incoming(makeCtx(self.first,true),evt);
                };
 
                this.pushOutgoing = function(evt){
                    self.last.outgoing(makeCtx(self.last,false),evt);
                };

}
  
 
function makeCtx(node, isIncoming){
 
                var incomingCtx = function(evt){node.next.incoming(makeCtx(node,true),evt);};
                var outgoingCtx = function(evt){node.prev.outgoing(makeCtx(node,false),evt);};
               
                if(isIncoming){
                                return {forward:incomingCtx, reverse:outgoingCtx};
                }
                else{
                                return {forward:outgoingCtx, reverse:incomingCtx};
                }
}

var p = new Pipeline();
p.addHandler({incoming:function(ctx,evt){console.log(evt);ctx.forward(evt+evt);}});
p.addHandler({incoming:function(ctx,evt){console.log(evt);}});
p.pushIncoming("yo");

