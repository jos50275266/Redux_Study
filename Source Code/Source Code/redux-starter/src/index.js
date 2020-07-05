import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed!");
});

store.dispatch(actions.bugAdded({ description: "Bug 1" }));
store.dispatch(actions.bugAdded({ description: "Bug 2" }));
store.dispatch(actions.bugAdded({ description: "Bug 3" }));
store.dispatch(actions.bugResolved({ id: 1 }));

// old version
// store.dispatch(bugAdded("Bug1"));
// store.dispatch(bugRemoved(1));
// store.dispatch(bugResolved(1));
// store.dispatch(bugAdded("Bug1"));
// store.dispatch(bugAdded("Bug2"));
// store.dispatch(bugAdded("Bug3"));
// store.dispatch(bugRemoved(1));

// Custom Version
// import store from "./customStore";
// import * as actions from "./actions";

// store.subscribe(() => {
//   console.log("Store Changed!");
// });
// store.dispatch(actions.bugAdded("Bug1"));
// console.log(store.getState());
