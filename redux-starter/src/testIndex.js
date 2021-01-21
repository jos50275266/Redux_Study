import { configureStore } from '@reduxjs/toolkit';
import configureStore from './combineStore/configureStore.js';

const store = configureStore();

// Uncaught Error: Actions may not have an undefined "type" property.
// Have you misspelled a constant?
// store.dispatch({})

// We cannot dispatch a function
// Uncaught Error: Actions must be plain objects. Use custom middleware
// for async actions
// store.dispatch(() => {
//   // Call an API
//   // When the promise is resolved => dispatch()
//   // If the promise is rejected => dispatch()
// });
// 바로 함수를 전달하지 못하는데 이것을 middleware를 이용해 해결해보자

store.dispatch((dispatch, getState) => {
  // Call an API
  // When the promise is resolved => dispatch()
  dispatch({ type: 'bugsReceived', bugs: [1, 2, 3] });
  console.log(getState());
  // If the promise is rejected => dispatch()
});
