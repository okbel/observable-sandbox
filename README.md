# Observable Sandbox
> This is an experiment and it's for learning purposes.
I'm going to dive deep into reactive programming, javascript and the DOM. Also, I'll be documenting the journey.

# Reactive Programming
Programming with event streams. streams are sequences of events.

## The problems:
- Async problems
- Race conditions - Concurrency issues
- Memory leaks - Events still attached
- Compley State Machines
- Uncaught Async Error

Immutability esentials
> These functions creates new arrays

- Map
- Filter
> Test function
- concatAll
> Takes a multi-dimensional array an flatens it by one dimension. `[[1], [2,3], [], 4]].concatAll() // [1, 2, 3, 4]` Notice the `[]` collection

### What is a Mouse drag?
From mouseDown until the next mouseUp
``` javascript
const getElementDrags = elem =>
    elem.mouseDowns
        .map(mouseDown =>
            document.mouseMoves
                .takeUntil(document.mouseUps))
        .concatAll();
        
 getElementDrags(image)
    .forEach(pos => image.position = pos);
```

> Building the collection you want
and consuming the collection

## Arrays and events
> Both are collections. Iterator and the Observer pattern were symetrical.
Different semantics. (data and error) => Completion and error

###  Iterator 
``` javascript
let iterator = [1, 2, 3].iterator();
iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { done: true }
```
> The consumer is in control

### Observer Pattern
> The producer is in control. The producer decides when you get the next value
``` javascript
document.addEventListener("mousemove", function next (e) {
    console.log(e);
});
```

Because in 1994 in GoF people missed to identify the symetry between an Observer Pattern and an Iterator Pattern we have so many Push APIs
- DOM Events
- Websockets
- Server-sent Events
- Node Streams
- Service Workers
- jQuery Events
- XMLHttpRequest
- setInterval