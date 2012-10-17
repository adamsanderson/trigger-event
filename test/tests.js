var trigger = require('trigger-event');
var assert  = require('component-assert');
var events  = require('component-event');

function triggerAndCatch(element, event, options, fn){
  // If no options are specified, assume the last param is the callback
  if ( !fn ){ fn = options; }
  
  events.bind(element, event, fn);
  trigger(element, event, options);
  events.unbind(element, event, fn);
}

describe('triggering', function(){
  describe('HTMLEvents', function(){
    it('triggers single scroll event', function(){
      var calls = 0;
      function called(){ calls++; }
      
      triggerAndCatch(document.body, 'scroll', called);
      
      assert(calls === 1);
    });
  });
  
  describe('MouseEvents', function(){
    it('triggers single click event', function(){
      var calls = 0;
      function called(){ calls++; }
      
      triggerAndCatch(document.body, 'click', called);
      
      assert(calls === 1);
    });
    
    it('sets screenX/Y to clientX/Y if not present', function(done){
      var options = {clientX: 10, clientY: 20};
      
      triggerAndCatch(document.body, 'click', options, called);

      function called(event){ 
        assert(event.screenX === options.clientX);
        assert(event.screenY === options.clientY);
        done();
      }
    });
    
    it('keeps screenX/Y if not present', function(done){
      var options = {clientX: 10, clientY: 20, screenX: 15, screenY: 25};
      
      triggerAndCatch(document.body, 'click', options, called);

      function called(event){ 
        assert(event.screenX === options.screenX);
        assert(event.screenY === options.screenY);
        done();
      }
    });
  });
  
})