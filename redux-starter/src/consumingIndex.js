import configureStore from './combineStore/configureStore.js';
// import * as actions from './combineStore/api.js';
import { loadBugs, addBug, resolveBug, assignBugToUser } from "./store/bugs.js";

const store = configureStore();

// store.dispatch(loadBugs());
// setTimeout(() => store.dispatch(loadBugs()), 2000);

// AddBug
// store.dispatch(addBug({ description: "a" }));

store.dispatch(loadBugs());
setTimeout(() => store.dispatch(assignBugToUser(1, 1)), 2000);


// UI Layer - This is too defailed to write down on UI Layer - Use Encapsulation
// store.dispatch(
//   actions.apiCallBegan({
//     url: '/bugs',
//     onSuccess: 'bugs/bugsReceived',
//   })
// );

// store.dispatch(
//   actions.apiCallBegan({
//     url: '/bugs',
//     onSuccess: actions.apiCallSuccess.type,
//     onError: actions.apiCallFailed.type
//   })
// );

// store.dispatch({
//   type: 'apiCallBegan', // apiRequest
//   payload: {
//     url: '/bugs',
//     onSuccess: 'bugsReceived',
//     onError: 'apiRequestFailed',
//   },
// });
