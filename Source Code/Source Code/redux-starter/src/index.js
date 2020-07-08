import configureStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";

const store = configureStore();

store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectAdded({ name: "Project 2" }));
store.dispatch(bugAdded({ description: "Hello World" }));
store.dispatch(bugAdded({ description: "Hi " }));

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log(x === y);
