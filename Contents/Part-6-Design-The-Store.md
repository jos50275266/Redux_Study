# Designing the Store

### Redux State vs Local State

```javascript
Store Global State
- 여러 컴포넌트에 공통으로 사용되는 경우
- 예시: E-Commerce
{
    cart: {},
    user: {}        
}
- Easy to implement


Store All State
- Unified Data Access
- Cacheability
- Easier Debugging (Redux Devtool)
- More Testable code
```

### Exception: Form State

- Temporary Values
- Too many dispatches
- Harder Debugging

#### The more state we put in the store, the more we can get out of Redux



# Structuring a Redux Store

```javascript
Object 방식을 이용하면 아래와 property 이름으로 Element에 접근

{
    1: { id: 1, description: "", resolved: false},
    2: {},
    3: {}
}

state[1]

Array 방식을 이용하면 아래와 같이 Index값으로 Element에 접근
[
    { id: 1, description: "", resolved: false},
    { ... },
    { ... }
]

const idx = state.findIndex(bug => bug.id === 1)
state[inx]

Object 방식이 Element에 접긴시 조금 더 간단한 방식으로 접근할 수 있다. 하지만 Array 방식과 비교했을 때 Element간의 순서가 필요한 경우 적합하지않다.

조금 더 간단한 방식 + 순서가 필요한 경우 아래와 같이 Object + Array 방식을 사용할 수 있다.

{
    byId: {
        1: { ... },
        2: { ... },
        3: { ... }            
    },
    allIds: [3, 1, 2]       
}
                     
```



# Combining Reducers

```javascript
{
    bugs: []
},
    
{
    projects: []
}

// 위 두 종류의 Store를 아래와 같이 만들어보자

{
    entities: {
        bugs: [],
        projects: [],
        ...
    }
}
```

두 Store의 Reducer를 Entities의 Reducer로 병합해보자.

```javascript
// projects.js
import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: {
        projectAdded: (projects, action) => {
            projects.push({
                id: ++lastId,
                name: action.payload.name
            })
        }
    }
})

export const { projectAdded } = slice.actions;
export default slice.reducer;


// bugs.js
import { createSlice } from "@reduxjs/toolkit"

let lastId = 0;

const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        
       bugResolved: (bugs, action) => {
           const idx = bugs.findIndex((bug) => bug.id === action.payload.id);
           bugs[idx].resolved = true
       }  
    }
})

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer

// entities.js
import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectReducer from "./projects";

export default combineReducers({
    bugs: bugsReducer,
    projects: projectReducer
})


// reducer.js
import { combineReducers } from "redux";
import entitiesReducer from "./entities";

export default combineReducers({
    entities: entitiesReducer
})


// configureStore.js
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export default function() {
    return configureStore({ reducer });
}

import configureStore from "./store/configureStore";
import * as actions from "./store/projects";

const store = configureStore();
```

# Normalization

Store 안에 있는 데이터의 중복을 방지한다는 의미이다.

```javascript
[
    {
        id: 1,
        description: "",
        project: { id: 1, name: "a" }
    },
    {
        id: 1,
        description: "",
        project: { id: 1, name: "a" }
    }
]

// Nesting 방식의 자료 구조는 복잡도를 높이기때문에 가능한 Flat하게 만들어야한다.
[
    {
        id: 1,
        description: "",
        project: 1 (id)
    },
    {
        id: 1,
        description: "",
        project: 1 (id)
    }
]
```

- Flat하게 만드는 Library로는 **normalizr**

# Selectors

```javascript
import configureStore from "./store/configureStore";
import * as projects from "./store/projects";
import * as bugs from "./store/bugs";

const store = configureStore();

store.dispatch(projects.projectAdded({ name: "Project 1" }));
store.dispatch(projects.projectAdded({ name: "Project 2" }));
store.dispatch(bugs.bugAdded({ description: "Hello World" }));
store.dispatch(bugs.bugAdded({ description: "Hi " }));

// Selectors
const unresolvedBugs = store
  .getState()
  .entities.bugs.filter((bug) => !bug.resolved);

console.log("unresolved", unresolvedBugs);
```

하지만 `unresolvedBugs`와 같은 로직은 추상화되어야한다. 그러므로 `index.js`가 아닌 `Bugs.js`에 정의해야한다.

```javascript
// bugs.js
import { createSlice } from "@reduxjs/toolkit"

let lastId = 0;

const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        
       bugResolved: (bugs, action) => {
           const idx = bugs.findIndex((bug) => bug.id === action.payload.id);
           bugs[idx].resolved = true
       }  
    }
})

// Selector Function - Takes state and return computed state
export const getUnresolvedBugs = state => 
	state.entities.bugs.filter(bug => !bug.resolved)
```

##### index.js

```javascript
import configureStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";

const store = configureStore();

store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectAdded({ name: "Project 2" }));
store.dispatch(bugAdded({ description: "Hello World" }));
store.dispatch(bugAdded({ description: "Hi " }));

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log(unresolvedBugs);

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log(x === y) // false
```

x와 y가 같지 않음은 문제가 된다. React에서는 State가 변경되면 Component가 Re-Rendering된다. 하지만 state가 변경되지 않음에도 매번 Re-Rendering이 발생하면 성능상에 큰 문제가 발생한다. 동일하게 Redux에서도 위와 같이 `store.getState`라는 꽤 메모리를 크게 차지하는 함수의 경우 그 값을 기억해두고 값이 변경되지 않은 경우 위의 예시처럼 x, y에 할당했을 때 함수를 두 번 호출하지 않고 그대로 그 값을 사용한다. 이러한 기술을 `Memorization` 이라고 칭한다.

```javascript
Memorization is a technique for optimizing expensive function.

f(x) => y 
이 결과를 Cache Memory에 저장하기: { input: 1, output: 2 }
그 이후에 다시 이 함수에 input 값을 1을 주고 함수를 실행을 시도하면
Cache Memory에 이전에 input 값에 1을 주었을때 나타난 결과값을 기억하기때문에
해당 함수를 한 번더 호출하지 않고 Cache Memory의 값을 바로 사용한다. 

만약 이 함수가 천 줄 정도의 길이에 수많은 조건문과 반복문으로 구성된 함수라고 생각해보자. 그렇다면 한 번 동작에 매우 큰 메모리를 차지하고 성능에도 큰 지장을 준다. 하지만 다음과 같이 { input: 1, output: 2 } 아주 짧게 입력값과 출력값만을 저장하면 성능에도 지장을 주지 않고 또한 아주 큰 메모리를 차지하는 함수를 쓸데없이 실행하는 상황을 방지할 수 있다.

// bugs => get unresolved bugs from the cache
// 위와 같은 cache 기능을 reselect library를 이용해 지원할 수 있다.
npm i reselect
```

Memorization을 이용해보자

```javascript
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // actions => action handlers
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

//export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

// Memorization을 이용하면 아래 첫번째 인자인 state값이 변경되지 않으면 두번째 인자로 준 함수가 실행되지 않는 방식으로 동작한다.
export const getUnresolvedBugs =createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;


// index.js
import configureStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";

const store = configureStore();

store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectAdded({ name: "Project 2" }));
store.dispatch(bugAdded({ description: "Hello World" }));
store.dispatch(bugAdded({ description: "Hi " }));

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log(x === y); // true
```

1. reselect 함수는 여러 인자값을 받을 수 있다.
2. 마지막 인자를 제외하고는 모두 state에 관한 정보를 인자값으로 전달한다.
3. 마지막 인자를 전달한 모든 인자값이 순서대로 함수의 형태로 전달된 마지막 인자값의 인자값으로 순서대로 붙는다.
4. 아래 예시와 같이 bugs, projects 순서로 인자값이 붙는다.

```javascript
import { createSelector } from "reselect";

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);
```

# Exercise

```javascript
Add the ability to
- assign a bug to a team member
- get the list of bugs assigned to a team member
```

