# trigger-event

Trigger native DOM events.  This is primarily useful for testing, or for 
triggering common DOM events such as the `change` event for custom components. 

## Installation
 
    component install adamsanderson/inline-edit

See [component](https://github.com/component/component#component) for more information.

## API

### trigger(el, name, options)

Triggers the `name` event on `el`.  Options may be passed in to customize the event.

HTMLEvents support the following options:
    
    bubbles
    cancelable

MouseEvents support the following options:

    bubbles
    cancelable
    detail (number of clicks)
    screenX / screenY
    clientX / clientY
    ctrlKey
    altKey
    shiftKey
    metaKey
    button (mouse button)

See the [W3C Event Spec](http://www.w3.org/TR/DOM-Level-2-Events/events.html) for more details.

Where sensible, sane defaults will be filled in.  See the list of event
types for supported events.

## Attribution

This is loosely based on [kangax](https://github.com/kangax)'s [event.simulate.js](https://github.com/kangax/protolicious/blob/master/event.simulate.js).

## License 
MIT

---

Adam Sanderson - http://monkeyandcrow.com