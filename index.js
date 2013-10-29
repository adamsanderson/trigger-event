module.exports = trigger;

/** 
  Event type mappings.
  This is not an exhaustive list, feel free to fork and contribute more.
  Namely keyboard events are not currently supported.
*/
var eventTypes = {
  load:        'HTMLEvents', 
  unload:      'HTMLEvents', 
  abort:       'HTMLEvents', 
  error:       'HTMLEvents', 
  select:      'HTMLEvents', 
  change:      'HTMLEvents', 
  submit:      'HTMLEvents', 
  reset:       'HTMLEvents', 
  focus:       'HTMLEvents', 
  blur:        'HTMLEvents', 
  resize:      'HTMLEvents', 
  scroll:      'HTMLEvents', 
  input:       'HTMLEvents',

  keyup:	   'KeyboardEvent',
  keydown:	   'KeyboardEvent',
  
  click:       'MouseEvents',
  dblclick:    'MouseEvents', 
  mousedown:   'MouseEvents', 
  mouseup:     'MouseEvents', 
  mouseover:   'MouseEvents', 
  mousemove:   'MouseEvents', 
  mouseout:    'MouseEvents',
  contextmenu: 'MouseEvents'
};

// Default event properties:
var defaults = {
  clientX: 0,
  clientY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true,
  view: null,
  key: '',
  location: 0,
  modifiers: '',
  repeat: 0,
  locale: ''
};

/**
 * Trigger a DOM event.
 * 
 *    trigger(document.body, "click", {clientX: 10, clientY: 35});
 *
 * Where sensible, sane defaults will be filled in.  See the list of event
 * types for supported events.
 *
 * Loosely based on:
 * https://github.com/kangax/protolicious/blob/master/event.simulate.js
 */
function trigger(el, name, options){
  var event, type;
  
  options = options || {};
  for (var attr in defaults) {
	  if (!options.hasOwnProperty(attr)) {
		  options[attr] = defaults[attr];
	  }
  }
  
  if (document.createEvent) {
    // Standard Event
    type = eventTypes[name] || 'CustomEvent';
    event = document.createEvent(type);
    initializers[type](el, name, event, options);
    el.dispatchEvent(event);
  } else {
    // IE Event
    event = document.createEventObject();
    for (var key in options){
      event[key] = options[key];
    }
    el.fireEvent('on' + name, event);
  }
}

var initializers = {
  HTMLEvents: function(el, name, event, o){
    return event.initEvent(name, o.bubbles, o.cancelable);
  },
  KeyboardEvent: function(el, name, event, o){
	// This is still incomplete, but useful for unit testing
    if (event.initKeyboardEvent) {
console.log(event.initKeyboardEvent);
		return event.initKeyboardEvent(
			name,
			o.bubbles,
			o.cancelable,
			o.view,
			'' + o.key,
			o.location,
			o.modifiers,
			o.repeat,
			o.locale
		);
	} else {
		return event.initKeyEvent(
			name,
			o.bubbles,
			o.cancelable,
			o.view,
			o.ctrlKey,
			o.altKey,
			o.shiftKey,
			o.metaKey,
			o.key,
			o.key
		);
	}
  },
  MouseEvents: function(el, name, event, o){
    var screenX = ('screenX' in o) ? o.screenX : o.clientX;
    var screenY = ('screenY' in o) ? o.screenY : o.clientY;
    var clicks;
    var button;
    
    if ('detail' in o) {
      clicks = o.detail;
    } else if (name === 'dblclick') {
      clicks = 2;
    } else {
      clicks = 1;
    }
    
    // Default context menu to be a right click
    if (name === 'contextmenu') {
      button = button = o.button || 2;
    }
    
    return event.initMouseEvent(name, o.bubbles, o.cancelable, document.defaultView, 
          clicks, screenX, screenY, o.clientX, o.clientY,
          o.ctrlKey, o.altKey, o.shiftKey, o.metaKey, button, el);
  },
  CustomEvent: function(el, name, event, o){
    return event.initCustomEvent(name, o.bubbles, o.cancelable, o.detail);
  }
};
