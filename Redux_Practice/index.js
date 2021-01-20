import store from "./store.js";
import { bugAdded, bugResolved, bugRemoved } from "./actions.js";

const unsubscribe = store.subscribe(() => {
    console.log("Store Changed!", store.getState());
});

store.dispatch(bugResolved(1));
unsubscribe();

store.dispatch(bugAdded("Bug 1"));
unsubscribe();

store.dispatch(bugRemoved(1));
unsubscribe();

// store.dispatch(bugAdded("Bug 2"));
console.log(store.getState());