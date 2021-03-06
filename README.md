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

### ConcatMap
Flattens a Map

## Promises
> Promises is not the right tool/primitive to unsubscribe. Use Observable instead.

**Promises cannot be canceled**

# Functional Programming

## Projecting Arrays
Projecting === Map

## Map Function
**Transforms each item**
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
**Applies test to each item**
> Return a new Array, takes a predicate function that returns a boolean

> For performance issues this needs to be as early as possible

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


## ConcatAll Method
> Flatten any two-dimentional Array. Works with Array of Arrays

**Notice that map() and concatAll() are very commonly chained together.**

**Become confortable with multi-dimensional Arrays**

__Apply `A-1` .concatAll s. Where A = levels deep__


``` javascript
Array.prototype.concatAll = function() {
  var results = [];

  this.forEach(function(subArray) {
    subArray.forEach(function(item) {
      results.push(item);
    });
  });

  return results;
};
```

## ConcatMap function
> Applies the projection function to each item. The projection
function will return a new child array. This will create a two-dimensional array.

``` javascript
Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
	return this.
		map(function(item) {
      return projectionFunctionThatReturnsArray(item)
		}).
		concatAll();
};
```


## Reduce
**When you need to perform an operation and look at two items at the same time**

### Canonical expresion of Reduce

### Javascript Implementation of reduce
``` javascript
[1, 2, 3].reduce(function(acc, curr) {
  return acc + curr
}) // 6
```

``` javascript
[].reduce(function(acc, curr) {
  return acc + curr
}) // Uncaught TypeError: Reduce of empty array with no initial value
```

This Implementation cannot be used with Observables.


### Implementation with Observables
Reduce should be able to return an Array

`{1...2....3}.reduce((acc, curr) => {.......6})`

``` javascript
Array.prototype.reduce = function(combiner, initialValue) {
	var counter,
		accumulatedValue;

	// If the array is empty, do nothing
	if (this.length === 0) {
		return this;
	}
	else {
		// If the user didn't pass an initial value, use the first item.
		if (arguments.length === 1) {
			counter = 1;
			accumulatedValue = this[0];
		}
		else if (arguments.length >= 2) {
			counter = 0;
			accumulatedValue = initialValue;
		}
		else {
			throw "Invalid arguments.";
		}

		// Loop through the array, feeding the current value and the result of
		// the previous computation back into the combiner function until
		// we've exhausted the entire array and are left with only one value.
		while(counter < this.length) {
			accumulatedValue = combiner(accumulatedValue, this[counter])
			counter++;
		}

		return [accumulatedValue];
	}
};
```

### Cloning Objects

``` javascript
var clone = JSON.parse(JSON.stringify(obj));
```
