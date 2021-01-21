import store from "./store/store";
import { bugAdded, bugResolved, bugRemoved } from "./store/actions";

const unsubscribe = store.subscribe(() => {
    console.log("Store Changed!", store.getState());
});

// store.dispatch(bugAdded("Bug 1"));
// store.dispatch(bugAdded("Bug 2"));
// store.dispatch(bugAdded("Bug 3"));
// store.dispatch(bugRemoved(1));

store.dispatch(bugAdded("Bug 2"));
console.log(store.getState());

