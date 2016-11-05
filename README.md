# Observable Sandbox
> This is an experiment and it's for learning purposes.
I'm going to dive deep into reactive programming, javascript and the DOM. Also, I'll be documenting the journey.

> _Write the answer. Declarative. Don't build a state machine_

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
>

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

## Introducing the Observable
> A Collection that arrives over time
`Observable === Collection + Time`

Observables can model
- Events
- Async Server Requests
- Animations

## Reactive Extensions
- Treats events as Streams

## Events to Observables
    `fromEvent`
    > will take a DOM Object and the name of the DOM event and adapt it to an Observable

``` javascript
Observable.fromEvent = function (dom, eventName) {
    // returning Observable object
    return {
        forEach: function(observer) {
            let handler = (e) => observer.next(e);
            dom.addEventListener(eventName, handler);

            //returning Subscription object
            return {
                dispose: function() {
                    dom.removeEventListener(eventName, handler);
                }
            }
        }
    }
}
```

## Subscription Schema

``` javascript
observable.subscription((x) => {
    // Streaming
  }, (err) => {
    // On Error
  }, () => {
    // On Completion
  })
```

## takeUntil
`<sourceCollection>.takeUntil(<stopCollection>)`


## Flatten Strategies

### ConcatAll

> Don't concatAll a stream that goes forever

### MergeAll
Order doesn't matter. All that matters is time.

### SwitchLatest
Switches to the latest Observable.
When a new observable comes, kills the previous that it's delayed.

## Promises
> Promises is not the right tool/primitive to unsubscribe. Use Observable instead.

**Promises cannot be canceled**

# Functional Programming

## Projecting Arrays
Projecting === Map

## Map Function
> Returns a new Array and executes the projection function in each item

``` javascript
Array.prototype.map = function(projectionFn) {
  var results = [];

  this.forEach(function(item){
    results.push(projectionFn(item));
  });

  return results;
};
```


## Filter Function
> Return a new Array, takes a predicate function that returns a boolean

``` javascript
Array.prototype.filter = function(predicateFn) {
  var results = [];

  this.forEach(function(item){
    if (predicateFn(item)) {
      results.push(item);
    }
  });

  return results;
};
```
