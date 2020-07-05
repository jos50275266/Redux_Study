# Writing Clean Redux Code

### Structuring Files and Folders

```javascript
src/
    store/
    	feature/
			actions.js
			actionTypes.js
			reducer.js
		bugs/
        projects/
            
            
// ---------------------------------------------------------------------
src/
    store/
    	auth/
			actions.js
			actionTypes.js
			reducer.js
		bugs/
        projects/

// ---------------------------------------------------------------------
// action을 변경하고 싶을때 actions.js, actionType.js, and reducer.js 세 파일을 모두 손봐야한다 이러한 번거로움을 방지하기 위해 Duck Pattern을 이용할 수 있다. 
// redux의 dux에서 따온 패턴이다.        
// actions.js + actionType.js + reducer.js 파일을 병합에 auth.js에 보관하면 조금 더 유지보수성이 좋을 수 있다. 그 이유는 세개의 파일을 번거롭게 오고갈 필요가 없기 때문이다. 즉 action 변경시 auth.js 파일에서만 수정하면되고 이러한 패턴을 Ducks Pattern이라 칭한다. 그에따라 bugs + projects 폴더 또한 그냥 하나의 파일로 만들어 관리할 수 있다. bugs.js 와 project.js 처럼
            
src/
    store/
        auth.js            
        bugs.js
		project.js
```

Name the artifacts based on their role

# Ducks Pattern

```javascript
// bugs.js
// Action Types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action Creators
export const bugAdded = description => ({
    type: BUG_ADDED,
    payload: {
        description
    }
})

export const bugRemoved = id => ({
    type: BUG_REMOVED,
    payload: {
        id
    }
})

export const bugResolved = id => ({
    type: BUG_RESOLVED,
    payload: {
        id
    }
})

// Reducer
let lastId = 0;
export default function reducer(state = [], action) {
    switch (action.type) {
        case BUG_ADDED:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description
                }
            ]
        
        case BUG_REMOVED:
            	return state.filter((bug) => bug.id !== action.payload.id)
        
        case BUG_RESOLVED:
            	return state.map((bug) => 
           	bug.id !== action.payload.id ? bug : { ...bug, resolved: true})
            
        case default:
            return state;
    }
}



// configureStore.js
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./bugs"

export default function configureStore() {
	const store = createStore(reducer, devToolsEnhancer)
    return store;
}


// index.js
import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
    console.log("Store Changed!");
})

store.dispatch(actions.bugAdded("Bug 1"))
store.dispatch(actions.bugAdded("Bug 2"))
store.dispatch(actions.bugAdded("Bug 3"))
store.dispatch(actions.bugResolved(1));



```

# Redux Toolkit

```javascript
npm i @reduxjs/toolkit
```

The Redux Toolkit is intended to the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

- **"Configuring a Redux store is too complicated"**
- **"I have to add a lot of packages to get Redux to do anything useful"**
- **"Redux requires too much boilerplate code"**

# Creating the Store

```javascript
// Before - bugs.js
// Action Types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action Creators
export const bugAdded = description => ({
    type: BUG_ADDED,
    payload: {
        description
    }
})

export const bugRemoved = id => ({
    type: BUG_REMOVED,
    payload: {
        id
    }
})

export const bugResolved = id => ({
    type: BUG_RESOLVED,
    payload: {
        id
    }
})
```

현재 모든 Action Creators이 객체(Object)를 리턴하고 있는 점을 Redux Toolkit을 이용해 개선할 수 있다.

```javascript
import { createAction } from "@reduxjs/toolkit"

const bugUpdated = createAction("bugUpdated")
console.log(bugUpdated);

// f bugUpdated

console.log(bugUpdated())
// {type: "bugUpdated", payload: undefined}


console.log(bugUpdated(1))
// {type: "bugUpdated", payload: 1}

console.log(bugUpdated({ id: 1 }))
// {type: "bugUpdated", payload: { id: 1} }

// createAction 메소드를 이용하면 아래와 같이 Action Types을 정의하지 않아도 된다. 
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// 대신에 아래와 같이 출력하면 type의 값을 얻을 수 있다.
console.log(bugUpdated.type) 
console.log(bugUpdate.toString()) // bugUpdated
```

#### createAction 메소드를 이용해서 Action Creators를 재정의해보자

```javascript
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

// reducer를 수정하면
let lastId = 0;
export default function reducer(state = [], action) {
    switch (action.type) {
        case bugAdded.type:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description
                }
            ]
        
        case bugRemoved.type:
            	return state.filter((bug) => bug.id !== action.payload.id)
        
        case bugResolved.type:
            	return state.map((bug) => 
                 	bug.id !== action.payload.id ? bug : { ...bug, resolved: true})
            
        case default:
            return state;
    }
}
```

index.js 부분 또한 수정해보자

```javascript
// 기존에 index.js는 아래와 같이 정의되어있다.
import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
    console.log("Store Changed!");
})

store.dispatch(actions.bugAdded("Bug 1"))
store.dispatch(actions.bugAdded("Bug 2"))
store.dispatch(actions.bugAdded("Bug 3"))
store.dispatch(actions.bugResolved(1));



// 위 방식 대신에 아래와 같이 리펙토링이 가능하다
store.dispatch(actions.bugAdded({ description: "Bug 1"});
store.dispatch(actions.bugAdded({ description: "Bug 2"});
store.dispatch(actions.bugAdded({ description: "Bug 3"});
store.dispatch(actions.bugResolved({ id: 1 });
```

# Creating Reducers

```javascript
// switch 문을 이용해 작성한 Reducers를 리펙토링해보자
// Immutable Update Pattern
import { createAction, createReducer } from "@reduxjs/toolkit"

// Reducer
let lastId = 0;
// createReducer(initialState, actionsMap)
createReducer([], {
    // key: value pair
    // actions: functions (event => event handler)
    bugAdded: (state, action) => {
        // Mutating Code를 작성해보자
       	state.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false
        })
    }
})

// Immer Library에서는 아래와 같이 사용한다
produce(initialState, draftState => {
    // draftState를 proxy 방식을 사용해서 모든 state 변경을 기록하고 그것을 initialState에 복사본에 붙여넣는다.
    draftState.x = 1;
})
```

아래에 이어서 Reduce를 리펙토링해보자. 아래 방식으로 `createReducer`를 사용하면 switch를 사용하거나 default case를 걱정하지 않아도된다.

```javascript
import { createAction, createReducer } from "@reduxjs/toolkit"

// Reducer
let lastId = 0;
createReducer([], {
    [bugAdded.type]: (bugs, action) => {
       	bugs.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false
        })
    },
    
    [bugResolved.type]: (bugs, action) => {
     const index = bugs.findIndex(bug => bug.id === action.payload.id);
     bugs[index].resolved = true;   
    }
})
```

# Creating Slices = Actions + Reducers

```javascript
import { createSlice } from "@reduxjs/toolkit"

let lastId = 0
const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        // actions => action handlers
        bugAdded: (bugs, action) => {
            bugs.push({
            	id: ++lastId,
            	description: action.payload.description,
            	resolved: false
        	});
        },
        
        bugResolved: (bugs, action) => {
         	const index = bugs.findIndex(bug => bug.id ===                             action.payload.id);
     		
            bugs[index].resolved = true;   
        }
    }
})

console.log(slice)
{ 
    name: "bugs"
  	reducer: f (state, action)
    actions: {bugAdded: f, bugResolved: f}
    caseRducers: {bugAdded: f, bugResolved: f}
}

export const { bugAdded, bugResolved } = slice.actions; 
export default slice.reducer;

// index.js
import * as actions from "./store/bugs";
import reducer from "./store/bugs"

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed!");
});

store.dispatch(actions.bugAdded({ description: "Bug 1" }));
store.dispatch(actions.bugAdded({ description: "Bug 2" }));
store.dispatch(actions.bugAdded({ description: "Bug 3" }));

store.dispatch(actions.bugResolved({ id: 1 }));
```

`createSlice method`를 이용하면 자동으로 `Action Creators and Action`을 생성해준다.

내부적으로 `creation action + create reducer` 방식으로 동작한다 생각할 수 있다.





























