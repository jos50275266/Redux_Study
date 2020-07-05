// 이 방식을 하면 이 함수를 import 후
// state.??? = something이 가능해짐 대신에
/*
function createStore() {
  let state;

  return {
    state,
  };
}
*/

import reducer from "./reducer";

function createStore(reducer) {
  let state;
  let listeners = [];

  // 함수안에 변수 선언하는 것 처럼 함수 또한 선언이 가능함 그 이유는 함수는 First-Class-Citizen in JS
  function dispatch(action) {
    // call the reducer to get the new state
    state = reducer(state, action);

    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    subscribe,
    getState,
    dispatch,
  };
}

/* index.js 에서
store.state = 1 
console.log(state)는 { state: 1, 등}이 출력되지만

store.getState()를 하면 undefined이 출력된다. 
정확히는 createStore안의 state와 외부에서 state로 부른 method는 다르다.
일종의 closure 개념이다.

*/
export default createStore(reducer);
