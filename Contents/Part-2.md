# Redux Part-2

#### Functional Programming in JavaScript

- Redux is built on top of functional programming principles, which is foreign to a lot of developers.

# What is Functional Programming?

![image-20200704000336727](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704000336727.png)

In a nutshell, functional programming is about decomposing a problem into a bunch of small and reusable functions that take some input and return a result. They don't mutate or change data.

![image-20200704000542738](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704000542738.png)

![image-20200704000555060](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704000555060.png)

#### We can compose these functions to build more complex function. What are the benefits?

- More Concise
- Easier to Debug
- Easier to Test
- More Scalable

We can run many function calls in parallel and take advantage of multiple cores of a CPU.

# Functions as First-Class Citizens

JavaScript functions are first class citizens, which means we can treat them just like any other variables.

#### Functions

- Assign to a variable
- Pass as an argument
- Return from other functions

JavaScript에서 함수는 First-Class-Citizens이다. 이것은 함수 또한 다른 객체(objects)들 처럼 다뤄진다는 것을 의미한다.

첫번째 경우는 함수를 호출하는 것이아닌 참조로써 변수에 할당하는 경우이다. 이 경우 **sayHello**라는 함수를 **fn**이라는 약어(**alias**)로 호출할 수 있음을 의미한다.

#### Case #1

```javascript
function sayHello() {
    return "Hello World"
}

let fn = sayHello;

fn() // "Hello World" - An alias for sayHello
sayHello() // "Hello World"
```

두번째 경우는 greet라는 함수가 인자값으로 함수를 받는 경우이다. greet함수의 인자값으로 sayHello 참조를 전달해보자. sayHello 함수를 호출하는 것이 아닌, 참조하는 것이다. JavaScript에서는 함수를 변수에 할당할 수 있다. 

#### Case #2

```javascript
function sayHello() {
    return "Hello World"
}

function greet(fnMessage) {
    console.log(fnMessage());
}

greet(sayHello) // "Hello World"
```

세번째 경우는 **sayBye**라는 함수의 리턴값으로 함수를 리턴하는 것이다. 이때 리턴하는 함수의 경우 이름이 존재하지 않기 때문에 익명함수**(anonymous function)**이라 칭한다. 이러한 구조에서 이 익명함수에 이름을 붙이는 방법은 아래와 같이 **sayBye**함수를 호출하고 그 호출한 결과값을 변수에 할당하는 방식을 이용할 수 있다.

#### Case #3

```javascript
function sayBye() {
    return function() {
        return "Hello World"
    }
}

// sayBye 함수를 호출했고 그에따른 리턴 값인 익명함수를 할당
// 해당 익명함수는 fn이라는 함수명을 가졌다고 생각할 수 있다.
let fn = sayBye();

// fn이라는 함수명을 가진 함수를 호출하면 "Hello World"라는 결과값이 message 라는 변수 할당됨을 알 수 있다.
let message = fn(); 

```

1. 함수는 참조의 형태 혹은 호출의 형태로 변수에 할당할 수 있다.
2. 함수는 다른 함수의 인자값으로 참조의 형태로 할당될 수 있다.
3. 함수는 함수를 리턴할 수 있는데 이 함수를 익명함수라 칭한다. 그리고 이 익명함수는 자기를 리턴값으로 사용하는 함수를 호출한 값을 한 변수에 할당함으로써 이름을 붙일 수 있다.

# Higher-Order Functions

```javascript
function greet(fn) {
    console.log(fn())
}

function sayHello() {
    return function() {
        return "Hello World!"
    }
}
```

함수 **greet**와 **sayHello**는 **Functional Programming**에서 **Higher-Order Functions** 이라 칭한다.

Higher Order Functions은 함수를 인자값 혹은 리턴값으로 가지고있는 함수를 의미한다.

Higher Order Functions을 예시로 들면 아래와 같다. 

```javascript
let numbers = [1, 2, 3];
numbers.map(number => number * 2)

setTimeout(() => console.log("Hello"), 1000);
```

# Function Composition

앞서 말한 것 처럼 함수형 프로그래밍은 여러 작고 재사용 가능한 함수를 작성해 그것들을 실제 세계의 복잡한 문제를 해결하기위해 결합하는 방식을 의미한다.

```javascript
// 아래 방식은 비함수형 스타일의 코드 구조이다.
let input = "     JavaScript     ";
let output = "<div>" + input.trim() + "</div>";

// 위 비함수형 스타일의 코드 구조를 함수형 프로그래밍 방식으로 변경하면 아래와 같다.
// trim
const trim = str => str.trim();

// wrapInDiv
const wrapInDiv = str => "<div>" + str + "</div>"
// or - Template Literal Version
const wrapInDiv = str => `<div>${str}</div>`

// toLowerCase
const toLowerCase = str => str.toLowerCase();


// This is called Function Composition in Functional Programming
const result = wrapInDiv(trim(input));
const anotherResult = wrapInDiv(toLowerCase(trim(input)));
```

위와 같은 함수형 프로그래밍 방식으로 구현하면 동작의 관찰과 테스트과 굉장히 용이해진다.

하지만 현재 **result**와 **anotherResult**에는 두 가지 문제가 발생한다. 

1. 함수를 읽을때 오른쪽에서 왼쪽으로 읽어야한다는 것이다. 

2. Function Composition이 크기가 커졌을때 너무 많은 parenthesis로 인해 복잡해 질 수 있다는 점이다. 

다음 부분에서 위 두 가지 문제를 해결해보자.

# Composing and Piping

#### Lodash

```javascript
import { compose, pipe } from "lodash/fp";

// 아래 방식은 비함수형 스타일의 코드 구조이다.
let input = "     JavaScript     ";
let output = "<div>" + input.trim() + "</div>";

// 위 비함수형 스타일의 코드 구조를 함수형 프로그래밍 방식으로 변경하면 아래와 같다.
// trim
const trim = str => str.trim();

// wrapInDiv
const wrapInDiv = str => "<div>" + str + "</div>"
// or - Template Literal Version
const wrapInDiv = str => `<div>${str}</div>`

// toLowerCase
const toLowerCase = str => str.toLowerCase();


// This is called Function Composition in Functional Programming
const result = wrapInDiv(trim(input));
const anotherResult = wrapInDiv(toLowerCase(trim(input)));

// 위 result and anotherResult에 있는 문제를 Lodash를 사용해 해결해보자.
// 1. 불필요한 Parenthesis를 제거해보자
// - 인자값으로 함수를 받는 Higher Order Function인 compose method를 사용하면 compose 인자값으로 받은 모든 함수를 활용한 새로운 함수(익명함수)를 리턴해준다.
const transform = compose(wrapInDiv, toLowerCase, trim)
transform(input);

// 2. 오른쪽에서 왼쪽으로 읽어가는 문제를 아직 해결하지 못했다.
// - pipe 함수를 이용해 이 문제를 해결해보자.
const transform = pipe(trim, toLowerCase, wrapInDiv);
transform(input);
```

# Currying

Currying is created by **Haskell Curry**

```javascript
const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`
const wrapInSpan = str => `<span>${str}</span>`
const toLowerCase = str => str.toLowerCase();

// 위 함수를 봤을때 개선할 수 있을 것 같은 부분은
// wrapInDiv와 wrapInSpan 함수가 div or span 이름을 가진 것을 제외하고 동일한 코드 구성을 가지고 있다는 점이다. 이 점을 개선해보자.

const trim = str => str.trim();
const wrap = (type, str) => `<${type}>${str}</${/type}>`;
const toLowerCase = str => str.toLowerCase();

const transform = pipe(trim, toLowerCase, wrap);
console.log(transform(input)); // <javascript>undefined</javascript>

/* 위와 같은 결과를 얻은 이유는 다음과 같다
pipe 함수는 말 그대로 pipe line을 생성한다
각 함수의 결과는 바로 인접하고 있는 함수의 인자값이 된다.
wrap 함수의 경우 두 개의 인자를 받는데 그 말은 즉슨 
trim --> toLowerCase 거친 str값이 wrap 함수의 두 번째 인자인 str로 가는 것이 아닌 첫번째 인자인 type으로 가게된다. 그렇게되면 wrap함수의 두 번째 인자인 str은 undefined가 되게된다. 
*/

// 만약 아래와 같이 함수를 호출하면 어떻게될까?
const transform = pipe(trim, toLowerCase, wrap("div"));
console.log(transform(input));
// Expected a function 에러가 발생한다.
// 그 이유는 pipe 함수의 인자의 타입은 함수여야하는데 인자를 제공하면 그것은 값이 되기 때문이다. 어떻게 하면 이 문제를 해결할 수 있을까?
// 일단은 pipe 함수를 사용할 수는 없다. 대신에 currying을 이용해 해결할 수 있다.

```



```javascript
function add(a) {
    return function(b) {
        return a + b;
    }
}

add(1)(5); // add(1, 5) 와 동일하게 동작한다.

const add2 = a => b => a + b; // (a, b) => a + b
// currying 개념을 이용해 아래 동작들을 다시 작성해보자

const trim = str => str.trim();
const wrap = type => str => `<${type}>${str}</${/type}>`;
const toLowerCase = str => str.toLowerCase();

// 이 방식을 취하면 wrap("div")의 경우 함수를 리턴하고 그 해당 함수에 trim과 toLowerCase의 과정을 거친 str이 인자값으로 전달되면서 원하는 결과를 얻을 수 있게된다.
const transform = pipe(trim, toLowerCase, wrap("div"))
console.log(transform(input))

const transform2 = pipe(trim, toLowerCase, wrap("span"))
console.log(transform(input))

```

currying은 N개의 인자값을 받는 함수를 마치 하나의 인자만 받는 함수처럼 여겨지게 만들어준다.

**N arguments ==> Single argument**

# Pure Functions

##### Same Arguments always return same result

```javascript
function myFunction(number) {
	return number * Math.random();
}
```

위 함수는 Pure Function이라고 할 수 없다 그 이유는 같은 인자값이라도 결과값이 일정하지 않기 때문이다.

```javascript
function myFunction(number) {
	return number * 2
}
```

이 함수는 Pure Function이라고 할 수 있다 그 이유는 같은 인자값에는 항상 같은 결과값을 리턴하기 때문이다.

## Pure Functions

- No random values
- No current date/time
- No global state (DOM, files, db, etc)

- No mutation of parameters

```javascript
function isEligible(age) {
	return age > minAge;
}
```

위 함수의 경우 **minAge**가 현재  글로벌 범위의 변수인데 이 값이 언젠가 변할 수 있는 가능성이 있다면 결과값이 인자값에 따라 일정하지 않기 때문에 Pure Function이라 칭할 수 없다. 이 함수를 Pure Function으로 만드는 방법은 다음과 같다.

```javascript
function isEligible(age, minAge) {
	return age > minAge;
}
```

### Benefits of Pure Funtion

- Self-Documenting
- Easily Testable
- Concurrency
- Cacheable

```javascript
// 아래 함수에 (1, 2) 를 넣었을때 항상 3이 나오는 것을 알기때문에 그 값을 Caching 할 수 있다. Intensive Computation에 유리하다.
function func(a, b) {}
```

# Immutability

#### Once created, cannot be changed

**Pure Function**은 인자값을 변화시키거나 변경할 수 없다.

```javascript
// String은 JavaScript을 포함해 대부분의 프로그래밍 언어에서 불변성이다.
let name = "Mosh";
// Original String인 name은 변하지않는다
let newName = name.toUpperCase();

// 반면에
// JavaScript에서 Object and Array는 불변성이아닌 가변성이다. JavaScript이 완전한 Functional Programming Language가 아니기 때문이다.
// const의 역할은 Reassignment를 불가능하게 하지 property 값을 변경하지 못하게 하는 것은 아니다.
const book = {};
book.title = "...";

book = {}; // 이거는 안된다 Reassignment 이기 때문이다.
```

## Why Immutability?

- Predictability
- Faster Change Detection

![image-20200704024748787](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704024748787.png)

React에서 state 변화를 빠르게 감지하기 위해 이러한 불변성의 특징을 이용한다. 예를 들면, 처음에 정의한 const book = {} 의 memory location이 100번이라고 생각해보자. 이때 불변성의 특징을 따를때 만약 이 객체에 새로운 프로퍼티를 추가했다면 memory location 100번에 위치하고있는 객체의 복사본을 만들고 그 복사본에 memory location 200번을 할당하고 그 후에 프로퍼티를 추가하게된다. 그리고 React는 변경된 객체의 위치와 이전의 위치를 비교하고 다르다면 바로 Re-rendering을 실행한다. 만약 Immutability 방식을 이용하지 않는다면 React는 모든 프로퍼티를 비교해야한다.

- Concurrency

만약 한 함수가 데이터를 변환/변경하지 않는다는 무결성이 보장되면 병렬으로 이 함수를 실행시킬 수 있다 그 이유는 state or memory 변경이 명확히 예측되기 때문이다.

### Should we always favour Immutability?

## Pros

- Predictability
- Faster Change Detection
- Concurrency

## Cons

- Performance

성능에 문제가 생길 수 있다 그 이유는 결국에 불변성을 보장해야하기 때문에 수천개의 객체에 새로운 프로퍼티가 추가되었다면 새로운 객체를 새로운 메모리 위치에 수천번 생성해야하기 때문이다.

- Memory Overhead

하지만 Memory Overhead를 가능한 줄여주는 Libraries를 이용하면 어느 정도 이 문제를 해결할 수 있다. 그리고 이 기술을 Structure Sharing이라고 칭한다

Structure Sharing은 두 객체 사이에 공통의 값이 존재한다면 그것을 서로 복사해 각각 가지고 있는 것이 아닌 그 값을 공유하는 방식을 이용한다.



정리하면 Immutability는 Redux와 같이 상태 관리에 사용되기 때문에 반드시 예측이 가능해야하고 변화를 빠르게 포착할 수 있어야하고 상태 관리에 작성된 함수는 값에 따라 항상 일정한 리턴값을 제공하는 특성을 지니고 예측가능한 상태 관리가 되기 때문이다.

# Updating Objects

Immutability Practice

```javascript
const person = {name: "John"};
// 이 방식은 새로운 location에 객체에 대한 메모리를 할당하고 거기에 person 객체의 프로퍼티를 모두 복사하는 방식을 취한다. 즉 Immutability를 보장한다.
Object.assign({}, person); 
Objett.assign({}, person, { name: "Bob" : age: "32"});

// 더 나은 방법은 다음과 같다
const person = {name: "John"};
// person object의 모든 프로퍼티를 복사하는법 - spread operator를 사용하기
// 이 경우 두번째 인자가 person object를 복사할 때 person 객체의 기존의 name을 overwrite한다. 이게 조금 더 간결해서 추천한다.
const updated = {...person, name: "Bob"}


// shallow copy를 주의해야한다. 
const person = {
	name: "John",
    address: {
        country: "USA",
        city: "Daegu"
    }
}

const updated = {...person, name: "Bob"}
updated.address.city = "New York";
// 출력해보면 original object인 person object의 city가 new york으로 변경된 것을 확인할 수 있다. 그 이유는 spread operator는 shallow copy를 하기 때문이다.
// 즉 현재 person과 updated의 address 프로퍼티는 동일한 memory location에 위치하고 있다.
console.log(person);

// 위 문제를 해결하기 위해 Deep Copy를 해야한다
const updated = {
    ...person,
    address: {
        ...person.address,
        city: "New York"
    }, // original object와 동일한 메모리를 사용하지 않기 위해
    name: "Bob"
}	

console.log(person);
console.log(updated);

// 하지만 Nesting 정도가 심해질 수록 Verbose하게된다 그렇기때문에 이러한 기능을 지원해주는 Library를 이용하는 대안이 있다.
```

# Updating Arrays

```javascript
const numbers = [1, 2, 3];

// Adding
const index = numbers.indexOf(2);

// slice method는 new array를 리턴한다.
const added = [...numbers.slice(0, index), 4, ...numbers.slice(index)];
console.log(added); // 특정 위치에 값을 추가하고 싶은 경우 [1, 4, 2, 3]

// Removing
// filter method 또한 new array를 리턴한다
const removed = numbers.filter(n => n !== 2);
console.log(removed);

// Updating
// map method 또한 new array를 리턴한다
const updated = numbers.map(n => n === 2 ? 20 : n);
console.log(updated);
```

# Enforcing Immutability

JavaScript Pure Functional Programming 언어가 아니기 때문에 Object Mutation을 막지않는다. Immutability의 특성을 강화하고 싶은 경우 다음과 같은 Libraries를 이용할 수 있다.

- **Immutable**
- **Immer**
- **Mori**

# Immutable.js

```javascript
let book = {title: "Harry Potter"};

function publish(book) {
    book.isPublished = true;
}

publish(book);

console.log(book);

//Immutable에서 제공하는 Immutability를 보장하는 자료 구조의 객체를 사용할 수 있다
// npm i immutable


import { Map } from "immutable";
// Map or HashMap - Key: Value Pair which is immutable

let book = Map({title: "Harry Potter"});
console.log(book.title); // 이거 안됨 대신에 get method를 ㅇ용
console.log(boo.get("title")); 

// JavaScript Object와 같이 사용하기에 좋지않음

function publish(book) {
  // Immutable 보장을 위해 - Original Book Object를 어떠한 영향도 미치지않고,     	new object를 리턴해줌
    book.set("isPublished", true)
}

book = publish(book);

// Convert Immutable Data Structure to Plain JavaScript
console.log(book.toJS());

// 이러한 복잡한 과정때문에 Immer 사용을 선호함
```



# Immer

```javascript
// npm i immer
let book = {title: "Harry Potter"};

function publish(book) {
    // original object에 변화를 줌 이거를 방지해보자
    book.isPublished = true;
}

publish(book);

console.log(book);

// immer
import { produce } from "immer"
let book = {title: "Harry Potter"};

function publish(book) {
// 이 패턴을 이용하면 original object인 book object에는 아무런 변화가 없다. 대신에 draftBook은 그저 proxy이고 book object에 준 변화를 다 기록하는 역할을한다. Immer를 사용하는 이유는 가독성이 좋기 때문이다.
	return produce(book, draftBook => {
        draftBook.isPublished = true;
    })
}

let updated = publish(book);

// original book object에는 아무런 변화가 발생하지 않음을 확인할 수 있다.
console.log(book); 
console.log(updated);
```

















