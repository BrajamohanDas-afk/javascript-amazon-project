# JavaScript

- When we are creating an array or a string, how do we have access to some methods like .push(), .slice() ??
## => It is because of prototypes
- everything we create, javascript automatically creates a prototype for us
- it links our `.__proto__` to an Object
- If it is an array then JS links our `﻿.__proto__` with `﻿Array.prototype` 
- Similiarly ﻿`Array.prototype` has it's own `.__proto__` and it is linked to `﻿Object.prototype` 
- Finally `﻿Object.prototype` has it's own `﻿.__proto__` which is `﻿null` 
## Suppose we write arr.push()
- First JS will try to search it inside arr itself, if not found then it will search in it's __proto__, if not found it will search in __proto__ 's __proto__ and it will continue searching until it reaches null.
---

## => Examples
### **1. Basic Class**
Creates an object with methods on its prototype.

```js
class Animal {
  speak() { console.log("Some sound"); }
}

const a = new Animal();
a.speak(); // Some sound
```
### **2. Class With Constructor**
Adds instance-specific properties.

```js
class Car {
  constructor(name) {
    this.name = name;
  }
  start() { console.log(`${this.name} started`); }
}

const c = new Car("Tesla");
c.start(); // Tesla started
```
### **3. Inheritance Using **`**extends**`  
Child inherits parent methods.

```js
class Animal {
  speak() { console.log("sound"); }
}

class Dog extends Animal {
  bark() { console.log("woof"); }
}

const d = new Dog();
d.speak(); // sound
d.bark();  // woof
```
### **4. Method Overriding**
Child replaces parent’s method.

```js
class Parent {
  greet() { console.log("Hello from parent"); }
}

class Child extends Parent {
  greet() { console.log("Hello from child"); }
}

const x = new Child();
x.greet(); // Hello from child
```
### **5. Using **`**super**`** to Call Parent Method**
Child calls parent method before/after own behavior.

```js
class Parent2 {
  greet() { console.log("Parent greeting"); }
}

class Child2 extends Parent2 {
  greet() {
    super.greet();
    console.log("Child greeting");
  }
}

const y = new Child2();
y.greet();
// Parent greeting
// Child greeting
```
## Proto vs Prototype
`﻿var b = new Foo(20);` 

`var c = new Foo(30);` 

![image.png](https://eraser.imgix.net/workspaces/RWYXlWozRa8trSasOOKy/awz6r5kCsVVk1RFo7UWtdtjKH8V2/image_3iuXak57ucAZPLXqfoYEF.png?ixlib=js-3.7.0 "image.png")

=> This figure again shows that every object has a prototype. Constructor function `Foo` also has its own `__proto__` which is `Function.prototype`, and which in turn also references via its `__proto__` property again to the `Object.prototype`. Thus, repeat, `Foo.prototype` is just an explicit property of `Foo` which refers to the prototype of `b` and `c` objects.

## Promises
### What is a Promise?
- A **Promise** represents a value that will be available **later** (fulfilled) or may **fail** (rejected).
- States:
    - `pending` 
    - `fulfilled` 
    - `rejected` 

```js
const promise = new Promise((resolve, reject) => {
  resolve("done");
});
```
---

### Promise vs Callback
**Callback**

- A function passed into another function to run later
- Can lead to **callback hell**
- Harder error handling
```js
doSomething(data, (err, result) => {
  if (err) { }
});
```
![callback.png](https://eraser.imgix.net/workspaces/RWYXlWozRa8trSasOOKy/awz6r5kCsVVk1RFo7UWtdtjKH8V2/callback_zuXLaELGn9wYC_oZwUXrf.png?ixlib=js-3.7.0 "callback.png")

**Promise**

- Cleaner chaining with `.then()` 
- Centralized error handling with `.catch()` 
```js
doSomething()
.then(result => {})
.catch(error => {});
```
---

## Promise Methods
### `Promise.resolve()` 
- Creates an already-fulfilled promise
```js
Promise.resolve(10).then(v => console.log(v));
```
---

### `Promise.all()` 
- Runs multiple promises **in parallel**
- Resolves when **all succeed**
- Rejects if **any fails**
```js
Promise.all([p1, p2])
.then(values => {})
.catch(err => {});
```
---

## Fetch API and Promises
### `fetch()` is a Promise
- `fetch()`  returns a **Promise of Response**
```js
fetch(url).then(response => {});
```
---

### `response.json()` is also a Promise
- Converts response body to JS object
- Asynchronous
```js
fetch(url)
.then(response => response.json())
.then(data => console.log(data));
```
---

### Why data goes into next `.then()` 
- Whatever you **return** from a `.then()`  becomes the **input** of the next `.then()` 
```js
.then(response => response.json()) // returns a Promise
.then(data => {})                  // receives resolved value
```
---

## Async / Await
### What `async` does
- Makes a function **always return a Promise**
- Even normal `return`  becomes `Promise.resolve(value)` 
```js
async function f() {
  return 10;
}
f().then(v => console.log(v));
```
![async.png](https://eraser.imgix.net/workspaces/RWYXlWozRa8trSasOOKy/awz6r5kCsVVk1RFo7UWtdtjKH8V2/async_f6GYWkcd6QZdYzFpuscgS.png?ixlib=js-3.7.0 "async.png")

---

### What `await` does
- Pauses execution **until Promise resolves**
- Returns the **resolved value**
```js
const data = await response.json();
```
---

### Rules of `await` 
- `await`  can be used **only inside **`**async**` ** functions**
- `await`  works **only with Promises**
---

### Instead of `.then()`, use `await` 
```js
// Using .then
fetch(url).then(r => r.json()).then(d => {});

// Using await (cleaner)
const r = await fetch(url);
const d = await r.json();
```
![async2.png](https://eraser.imgix.net/workspaces/RWYXlWozRa8trSasOOKy/awz6r5kCsVVk1RFo7UWtdtjKH8V2/async2_XDswsIqoNPbkwcm3EbacW.png?ixlib=js-3.7.0 "async2.png")

---

### Returning from `async` function
- Returned value becomes a Promise
- You can use `.then()`  on it
```js
async function getData() {
  return "hello";
}
getData().then(v => console.log(v));
```
---

## ⚠️ Important Correction
❌ **Incorrect**:

>  async await can only be used with callbacks 

✅ **Correct**:

- `async/await`  works with **Promises**
- Callbacks do **not** work with `await`  unless converted to Promises
---

## Error Handling
### `.catch()` with Promises
```js
fetch(url)
.then(r => r.json())
.catch(err => console.log(err));
```
---

### `try...catch` with sync and async code
```js
try {
  const data = await fetch(url);
} catch (err) {
  console.log(err);
}
```
---

### `throw` 
- Manually generates an error
- Works in sync and async code
```js
throw new Error("Something went wrong");
```
---

### `reject` 
- Used inside Promises to signal failure
```js
return new Promise((resolve, reject) => {
  reject("failed");
});
```
---

## Callbacks & Event Listeners
- Callback-based APIs (like `XMLHttpRequest` , DOM events)
- Require **event listeners** to catch success/error
```js
xhr.addEventListener("error", () => {});
```
---

## HTTP Request Types
- **GET** → Read data
- **POST** → Create data
- **PUT** → Update entire data
- **DELETE** → Remove data
---

## URL Parameters
### Single parameter
```js
const url = new URL(location.href);
url.searchParams.get("id");
```
---

### Multiple parameters
```js
url.searchParams.get("id");
url.searchParams.get("name");
```


