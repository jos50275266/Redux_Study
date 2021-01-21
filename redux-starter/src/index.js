import configureStore from "./store/configureStore";
import { bugAdded, bugResolved, bugRemoved } from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
    console.log("Store Changed!", store.getState());
});

store.dispatch(bugAdded({ description: "Bug 1"}));
store.dispatch(bugAdded({ description: "Bug 2"}));
store.dispatch(bugAdded({ description: "Bug 3"}));
store.dispatch(bugResolved({ id: 1 }));

console.log(store.getState());

