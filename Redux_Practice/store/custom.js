import store from "./customStore.js";
import * as actions from "./actions.js";

/*
// { getState } 객체를 리턴하니까 
store.state = 1;
// getState 함수가 리턴하는 값은 내부의 Closure를 이용한 state이기 때문에 
// store.state = 1;과 다른 값이다.
console.log(store.getState());
// Private Properties 
console.log(store);
*/

store.subscribe(() => {
  console.log("Store Changed...")  
})

store.dispatch(actions.bugAdded("Bug 1"));
console.log(store.getState())