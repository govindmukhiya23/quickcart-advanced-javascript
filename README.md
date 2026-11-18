# QuickCart Advanced JavaScript

## Overview

This project fixes and improves the QuickCart order management code using modern JavaScript (ES6+). It is split into six parts: objects and classes, array methods, JSON handling, asynchronous code, performance with DOM events, and a final integration task.

Loom video: add your link here
Live link: N.A

## Technologies Used

- JavaScript (ES6+)
- HTML5 and CSS3 (Part E only)
- Node.js to run the console files
- No frameworks or libraries

## How to Run

Parts A, B, C, D and F run in the terminal. Go to the project folder and run:

```
node part-a-objects-classes/products.js
node part-b-array-methods/shopping-cart.js
node part-c-json-debugging/json-handling.js
node part-d-asynchronous/order-processing.js
node part-f-integration/quickcart.js
```

Part D takes around 25 seconds because of the 1 second delays.

Part E runs in the browser. Open `part-e-optimization-events/index.html` in Chrome. Open the console (F12) to see extra logs.

## Project Structure

```
quickcart-advanced-javascript/
├── part-a-objects-classes/products.js
├── part-b-array-methods/shopping-cart.js
├── part-c-json-debugging/json-handling.js
├── part-d-asynchronous/order-processing.js
├── part-e-optimization-events/index.html, script.js, style.css
├── part-f-integration/quickcart.js
├── screenshots/
└── README.md
```

---

## Part A - Objects, Prototypes and ES6 Classes

`products.js` creates products with a constructor function and a prototype method, then with ES6 classes (`ElectronicProduct` and `ClothingProduct` extend `Product`), and finally uses arrow functions, template literals, destructuring, rest and spread.

**Task 1**
1. The prototype method is stored once and shared by every product. If it is inside the constructor, each object gets its own copy and wastes memory.
2. `prototype` belongs to constructor functions and is the object given to new instances. `__proto__` is on every object and points to the prototype it inherits from.
3. JavaScript looks up the prototype chain. If it reaches the end (`null`) without finding the property, the result is `undefined`.

**Task 2**
1. `extends` makes a child class inherit the properties and methods of a parent class.
2. In a child class the parent constructor creates `this`. Using `this` before `super()` gives a ReferenceError.
3. No. Classes are a cleaner syntax on top of prototypes. A class is still a function and inheritance still uses the prototype chain.

## Part B - Array Methods, Map, Set and Object Methods

`shopping-cart.js` uses `map`, `filter`, `reduce` and `forEach` on the cart, then a `Map` for inventory, a `Set` to remove duplicate emails, and `Object.freeze` / `Object.seal`.

**Task 1**
1. `map()` returns a new array. `forEach()` returns nothing.
2. No, `filter()` returns a new array and leaves the original unchanged.
3. `reduce()` combines all items into one value, so it is perfect for totals.
4. `map()`.

**Task 2**
1. A Map accepts any type as a key, keeps insertion order and has a `size` property. A plain object only uses strings and symbols as keys.
2. A Set only stores unique values, so duplicates are dropped automatically.
3. Yes, a Map can use an object as a key.
4. Yes, a Set keeps insertion order.

**Task 3**
1. `freeze()` blocks changes, additions and deletions. `seal()` blocks additions and deletions but still allows changing existing values.
2. Yes, existing values can be changed after `seal()`.
3. No, nested objects are not frozen automatically.
4. Shallow freezing means only the top level is frozen. Objects inside can still change (the demo shows `nested.details.items` changing).

## Part C - JSON Handling and Output Prediction

`json-handling.js` converts an order to JSON and back. `deliveryDate` (undefined) and `calculateTax` (function) are lost, while `discount: null` stays. JSON has no type for functions or undefined, so they are skipped in objects.

| Question | Output | Reason |
|---|---|---|
| Q1 | `{"name":"Rahul"}` | undefined properties are skipped |
| Q2 | `[10,null,30]` | undefined in an array becomes null to keep positions |
| Q3 | `{"price":null,"discount":null}` | NaN and Infinity are not valid JSON numbers |
| Q4 | SyntaxError | JSON needs double quotes around keys and strings |
| Q5 | TypeError (circular structure) | the object points to itself, so it can never finish |
| Q6 | `{"createdAt":"2026-01-01T00:00:00.000Z"}` | Date has a `toJSON()` that returns an ISO string |

## Part D - Asynchronous JavaScript

`order-processing.js` has the event loop prediction, the order flow with callbacks, Promises and async/await, and all four Promise combinators.

Event loop output order: Order Started, Order Completed, Payment Successful, Payment Processing.

**Task 1**
1. The Promise callback is a microtask. Microtasks run before the next macrotask, and `setTimeout` is a macrotask.
2. The microtask queue holds Promise callbacks. The macrotask queue holds timers and events.
3. The call stack runs the code that is currently executing, one function at a time.
4. The event loop checks the call stack. When it is empty it moves callbacks from the queues to the stack.

**Task 2:** Nested callbacks go deeper and deeper (callback hell), which makes the code hard to read, hard to debug and hard to handle errors in.

**Task 5**
1. `all()` fails as soon as one Promise rejects. `allSettled()` waits for all of them and reports each status.
2. `race()` returns the first Promise that settles, whether it succeeded or failed.
3. `any()` ignores rejections and waits for the first success. `race()` takes the first result of any kind.
4. If every Promise rejects, `any()` rejects with an `AggregateError`.

## Part E - Performance Optimization and DOM Events

The page in `part-e-optimization-events` has a debounced search (500 ms), a throttled scroll handler (1000 ms), a memoized discount calculator, a bubbling demo with a stop propagation checkbox, and a delegation demo with add and remove buttons.

**Task 2**
1. Debouncing waits until the user stops the action. Throttling runs the action at fixed intervals while it keeps happening.
2. Debouncing suits search suggestions.
3. Throttling suits scroll and resize events.

**Task 3**
1. Memoization stores the result of a function for given arguments.
2. Repeated calls with the same arguments return the saved result instead of calculating again.
3. The cache lives in a closure, so the returned function can remember it between calls.

**Task 4**
1. Event bubbling means an event on an element also runs the handlers of its parents.
2. Event delegation means adding one listener to a parent and using `event.target` to find which child was clicked.
3. New elements work without adding new listeners.
4. `event.stopPropagation()` stops the event from reaching the parent handlers.
5. `event.target` is the element that was clicked. `event.currentTarget` is the element the listener is attached to.

## Part F - Final Integration

`quickcart.js` builds the order summary for Rahul. It uses a `Product` class, destructuring, `map`, `filter`, `reduce`, a `Set` for unique IDs, a `Map` for inventory, a frozen config object, `JSON.stringify` and an async order confirmation with try/catch. All values are calculated by the code. The output matches the reference and ends with a few extra detail lines.

## Screenshots

Part E (open `index.html`, then save screenshots in the `screenshots` folder with these names):

![Search and scroll](screenshots/search-scroll.png)
![Memoization](screenshots/memoization.png)
![Bubbling and delegation](screenshots/events.png)
# quickcart-advanced-javascript
