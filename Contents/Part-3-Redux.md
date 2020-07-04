# Redux Architecture

Part-1에서 언급했듯이 Redux는 우리의 application의 state를 A single JavaScript object인 Central Repository에 저장한다. 

![image-20200704143026815](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704143026815.png)

예를 들면, e-commerce app에서 이 Redux를 사용하면 카테고리, 쇼핑 카트, 현재 접속하고 있는 유저 정보와 같은 프로퍼티를 이 Central Repository에 저장할 수 있습니다. 하지만 Redux는 저장한 정보가 카테고리, 쇼핑 카트, 유저 정보 등인지 알지 못한다. 

대신에 arrays, objects, numbers, booleans 값 중 하나라고 인식한다.

```javascript
{
    categories: [],
    products: [],
    cart: {},
    user: {}        
}
```

`Redux`의 `Central Repository`를 이용할 때 우리는 직접 Store(Central Repository)의 데이터를 변경/변화시킬 수 없다. 왜냐하면 `Redux`는 `Functional Programming Principles`의 최상단에 자리 잡고 있기 때문이다. `Functional Programming`에서는 `state `값을 변경할 수 없다. 

그러므로 아래와 같이 코드를 작성할 수 없다. 왜냐하면 우리의 `store(Central Repository)`는 불변성의 객체 `(Immutable Object)`이기 때문이다.

```javascript
store.currentUser = { name: "Mosh" }
```

이 값을 갱신하기 위해서는 반드시 `store`를 함수의 인자로 받고 그 후 받은 인자를 갱신하고 그 갱신한 `store`를 리턴하는 방식을 취해야 한다. 

```javascript
function reducer(store) {
	// return updated store
}
```

위 함수에서는 `spread operator`를 사용해 `a copy of the store`를 생성하거나, `Part-2`에서 언급한 `Immutability Libraries` (**Immutable.js** or **Immer**)를 사용하는 방식을 이용할 수 있다.

```javascript
function reducer(store) {
	const updated = { ...store };
}
```

함수의 이름은 `reducer`인데 여기서 기억해야 할 점은

1. `reducer` 함수는 `the current instance of the store`를 인자 값으로 받고
2. `reducer` 함수는 인자 값으로 받은 `store`의 프로퍼티를 갱신한 후 그 `store`를 리턴해준다.

##### reducer는 어떻게 인자로 받은 store의 어떤 값을 갱신해야 하는지 파악할까?

- 쇼핑카트를 업데이트 해야 할까?
- 카테고리를 업데이트 해야 할까?

```javascript
function reducer(store) {
	const updated = { ...store };
	updated.currentUser = ???
    updated.categories = ???
    updated.cart = ???
}
```

인자로 받은 `store`의 값 중 어떤 값을 갱신해야 하는지 파악하기 위해 `reducer`는 두 번째 인자로 `action`이라는 `a plain JavaScript object`를 받는다. 이 `Object`는 `store`에 무슨 일이 발생할지를 설명해준다. 

예를 들면

- 쇼핑카트를 업데이트해라
- 카테고리를 업데이트해라

```javascript
function reducer(store, action) {
	const updated = { ...store };
	updated.products = ???
}
```

`action`에 정의된 형태에 기반을 두고 `Reducer`는 어떤 프로퍼티를 갱신해야 하는지 알 수 있다. 즉 모든 갱신은 `a single function`에서 발생한다. 실제로 `Redux`를 사용할 때 다수의 `slice (reduce)`를 이용할 수 있다. 각 `Reducer`는 `Central Repository`의 특정 프로퍼티를 갱신하는 역할을 한다. 비유를 들자면 다수의 부서가 존재하는 조직을 생각해보자. 각 조직은 매니저가 있고 이 매니저는 자기가 속한 조직을 책임져야 하고 자기가 속한 조직을 제외한 다른 조직은 책임지지 않는다. 그 이유는 각 조직을 책임지는 매니저가 있기 때문이다.

```javascript
{
	categories: [],
	products: [],
	cart: {},
	user: {}
}
```

![image-20200704150618531](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704150618531.png)

**Store**: 우리의 `App`의 `state`를 포함하고 있는 `a single plain JavaScript Object`

**Actions**: 우리의 `App`에서 `state`와 관련해서 무슨 일이 발생하는지를 나타내는 `plain JavaScript Objects`이다. 이것을 `Event`라 생각해도 된다. 그 이유는 프로그래밍에서 한 `event`는 무슨 일이 발생한지를 나타내기 때문이다. 

**Reducers**: 만약 `store`에 4개의 프로퍼티가 존재한다면 각각의 프로퍼티의 갱신을 담당하는 4개의 `reducer`가 필요하다. 여기서 `Reducer`를 `Event Handler or Processors`라고 생각해도 된다. 하지만 `Event Handler` 대신에 `Reducer`라고 부르는 이유는 `Event Handler`는 일반적으로 `Object Mutation`가 관련이 있는데 `Redux`에서는 `Immutability` 보장을 위해 `Object Mutation`을 하지 않기 때문이다. 이 `Reducer`는 `Pure Function`이다. 

그래서 이 `Pure Function`은 `Global State`에 미치지 않고 또한 인자값으로 받은 `Object`를 변경/변화시키지 않는다 (Original Object에 변화를 주지 않음을 의미한다). 그리고 이러한 특성한 `Side Effects`를 가지지 않음을 보장한다. 

![image-20200704151728252](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704151728252.png)

### 그러면 어떻게 Action - Store - Reducer가 함께 동작할까?

1. 사용자가 `state` 갱신에 관한 한 행위`(action)`를 수행한다 (쇼핑카트에 한 요소를 추가하는 행위). `Action Object`를 생성해 `Store Object`가 가지고 있는 `Dispatch method`의 인자값으로 `Action Object`를 전달한다.
2. `Store`의 `Dispatch method`에 인자로 전달된 `Action Object`와 함께 `Reducer`를 호출하는 역할을 한다.
3. `Store`가 `Reducer method`를 호출하고 그 이후 `reducer`는 `store(original) object + action object`를 가지고 갱신된 부분을 확인하고 `new state(새로운 상태)`를 `store`로 리턴해준다. 결과적으로 `Store`에는 갱신된 `state`가 내부적으로 다시 저장된다.
4. 이 갱신된 `state`를 기반으로 `Update`에 관한 `UI Components`에게 알림을 주고 그 값을 갱신한다.

![image-20200704152719773](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704152719773.png)

##### 왜 Redux는 store의 entry-point로써 dispatch action의 방식을 이용한 것일까?

`Dispatch`는 `an entry point to our store`라 생각할 수 있다. `Dispatch`를 통해 근본적으로 모든 `action`을 같은 `entry point`에 전달할 수 있다. 또한 사용자가 `Action`을 발생시킬 때마다 해당 `action`에 따라 어떤 처리를 해야 하는지를 관리하는 `Central Place`가 있고 이것을 통해 매번 `Action`이 발생 시 로깅과 같은 알림을 나타낼 수 있다. 또한 이러한 방식 때문에 쉽게 `Undo/Redo`가 가능하다.



나의 말로 요약:
`Dispatch`의 존재를 실생활에 묘사하면 다음과 같다.

손님 --> 직원 --> 포스기 --> 요리사

손님이 주문하고 이 직원이 주문을 받는 과정까지가 `Action or Event`의 발생이다

그 후 직원이 바로 요리사에게 전달해도 되지만 이렇게 하면 식당의 관점에서 두 가지 문제가 생긴다. 

1. 기록 없이 말로 전달하기 때문에 직원이 주문을 잘못할 수 있다.
2. 기록 없이 말로 전달해서 요리사가 주문 내역을 까먹을 수 있다.

하지만 포스기를 배치함으로써 내가 똑바로 주문을 받았는지 한 번더 확인할 수 있고 또한 포스기를 통해 주문한 내용이 영수증 형식으로 요리사에게 전달되기 때문에 요리사 또한 주문 내역을 보고 음식 조리시 기억에 의존하지 않아도 된다. 또한 주문이 잘못 들어갔을 때 빠르게 포스기의 주문 내역을 변경해 요리사가 요리를 시작하기 전에 주문을 변경할 수 있다. 

여기서 포스기의 역할이 바로 `Redux`에서 `Dispatch `방식을 이용하는 이유라고 이해했다.

# Redux App

#### Steps

- Design the store
- Define the actions
- Create a reducer
- Set up the store

```javascript
npm i redux
```

# Designing the Store

Redux App에서 첫번째로 해야하는 것은 store를 설계하는 것이다. 우리는 store에 무엇을 저장하고 혹은 유지시키고 싶은지 결정해야한다. 이번 Bug Tracking Application 프로젝트에서 state에 저장해야할 것은

```javascript
[
    {
        id: 1,
        description: "",
        resolved: false
    },
    { ... },
    { ... }
]


// 위와 같이 Array를 사용한 구조 대신에, 아래와 같이 Object 구조를 사용할 수 있다. 이 Object는 bugs라는 프로퍼티를 가지고  또한 currentUesr 프로퍼티를 가질 수 있다. 현재 state에는 두 가지의 slice가 존재한다고 말할 수 있다.
// 첫번째 slice = bugs
// 두번째 slice = currentUser
// 두 개의 slice가 있다는 말은 각 slice에 대한 두 개의 reducer가 필요하다. 
// ---------------------------------------
{
    bugs: [
	{
        id: 1,
        description: "",
        resolved: false
    	}
    ],
    currentUser: {}      
}
```

# Defining the Actions

![image-20200704234511800](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704234511800.png)

```javascript
{
	type: "ADD_BUG",
	description: "..."
}

// -----------------------------

{
    type: "bugAdded",
    payload: {
        description: "..."
    }
}

// .......................
{
    type: "bugRemoved",
    payload: {
        id: 1
    }
}
```

# Creating a Reducer

```javascript
// []
let lastId = 0;

// If statement Usage Version
// This Reducer is a pure function
// 몇번을 호출하던 동일한 결과값을 리턴
function reducer(state = [], action) {
  if (action.type === "bugAdded") {
    return [
      ...state,
      {
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      },
    ];
  } else if (action.type === "bugRemoved") {
    return state.filter((bug) => bug.id !== action.payload.id);
  }

  return state;
}

// Switch Cases Usage Version
function reducer(state = [], action) {
  switch (action.type) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case "bugRemoved":
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}

```

# Creating the Store

```javascript
import { createStore } from "redux";
import reducer from "./reducer";

// createStore is another higher order functon
const store = createStore(reducer)

export default store;
```

# Dispatching Actions

```javascript
import store from "./store";

console.log(store);
/*
dispatch: 
subscribe: get notify everytime state is changed
getState: 
- we only have get state, not set state
- to change the state of store we have to dispatch an action
- in order to send every action in same start point
replaceReducer
Symbol(observable)
*/

// Get Current State
console.log(store.getState());

// Let's pass an action
store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

console.log(store.getState());

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1,
  },
});

console.log(store.getState());

```

# Subscribing to the Store

```javascript
import store from "./store";

store.subscribe(() => {
  // state가 변경될 때마다 로깅해주는 기능 subscribe
  // 이 부분에서  react 등 re-rendering을 하면 된다
  console.log("Store changed!", store.getState());
});

// Let's pass an action
store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

console.log(store.getState());

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1,
  },
});

console.log(store.getState());

```

### Unsubscribe

```javascript
import store from "./store";

// 이미 추적된 state의 경우 unscribe를 해준다 그 이유는 메모리 누수 때문이다
// state에 update가 발생할 때 마다 새로운 메모리에 state를 생성하기 때문이다.
const unsubscribe = store.subscribe(() => {
  // state가 변경될 때마다 로깅해주는 기능 subscribe
  // 이 부분에서  react 등 re-rendering을 하면 된다
  console.log("Store changed!", store.getState());
});

// Let's pass an action
store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

unsubscribe();

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1,
  },
});

// 이전에 unscribe를 했기 때문에 이 시점에는 로깅을 하지않는다 (not notified)

console.log(store.getState());

```

# Action Types

```javascript
import store from "./store";

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

console.log(store.getState());

```

- 만약 내일 `bugAdded`라는 값을 `bugCreated` 로 변경 하고 싶다고 생각해보자. 그렇게되면 store과 reducer모두 변경해야한다. 하지만 아래와 같이 `actionType.js`를 정의하면 유연하고 유지성 좋은 코드를 짤 수 있다.

```javascript
// dataTypes.js
export const BUG_ADDED = "bugAdded";
export const BUG_REMOVED = "bugRemoved";



// reducer.js
// import { BUG_ADDED, BUG_REMOVED } from "./actionTypes"; or
import * as actions from "./actionTypes";
// []
let lastId = 0;

// Switch Cases Usage Version
export default function reducer(state = [], action) {
  switch (actions.BUG_ADDED) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}	


// index.js
import store from "./store";

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

console.log(store.getState());

```

하지만 아직까지 `action`을 `dispatch `하는 과정에 문제가 있다. 만약 이 `action`을 여러 곳에서 사용하면 `dispatch`의 인자 값으로 들어간 `state object`를 여러번 작성해야한다. 이 과정을 개선해보자.

### Action Creators

```javascript
// actions.js
import * as actions from "./actionTypes";

// export function bugAdded(description) {
//   return {
//     type: actions.BUG_ADDED,
//     payload: {
//       description,
//     },
//   };
// }

export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: {
    description,
  },
});

// index.js
import store from "./store";
import { bugAdded } from "./actions";

store.dispatch(bugAdded("Bug1"));

console.log(store.getState());

```

### Exercise

- Implement resolving a bug.

1. Actions
2. Reducers

```javascript
// 1. actionsTypes.js 
// BUG_RESOLVED 추가
export const BUG_RESOLVED = "bugResolved";

// 2. actions.js
export const bugResolved = id => ({
    type: actions.BUG_RESOLVED,
    payload: {
        id
    }
});

// 3. reducer.js
import * as actions from "./actionTypes";

let lastId = 0;

export default function reducer(state = [], action) {
  switch (actions.BUG_ADDED) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
          
    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);
	
    case actions.BUG_RESOLVED:
      return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})    
          
    default:
      return state;
  }
}


// index.js
import store from "./store";
import { bugAdded, bugResolved } from "./actions";

store.dispatch(bugAdded("Bug1"));

console.log(store.getState());

store.dispatch(bugResolved(1));

console.log(store.getState());



```



