// import store from "./store";
// import { bugAdded, bugRemoved, bugResolved } from "./actions";

// const unsubscribe = store.subscribe(() => {
//   console.log("Store Changed...", store.getState());
// });

// store.dispatch(bugAdded("Bug1"));
// store.dispatch(bugRemoved(1));
// store.dispatch(bugResolved(1));

// Custom Version
import store from "./customStore";
import * as actions from "./actions";

store.subscribe(() => {
  console.log("Store Changed!");
});
store.dispatch(actions.bugAdded("Bug1"));
console.log(store.getState());
