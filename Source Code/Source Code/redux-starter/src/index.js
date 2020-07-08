import { createStore, applyMiddleware } from "redux";
import configureStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsByUser,
} from "./store/bugs";
import { userAdded } from "./store/users";
import logger from "./store/middleware/logger";

const store = configureStore();
// configureStore를 사용하지 않으면
// const store = createStore(reducer, applyMiddleware(logger));

store.dispatch(userAdded({ name: "User 1" }));
// store.dispatch(userAdded({ name: "User 2" }));
// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(projectAdded({ name: "Project 2" }));
// store.dispatch(bugAdded({ description: "Hello World" }));
// // This is how we normalize state
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugAdded({ description: "Hi " }));

// // const bugs = getBugsByUser(2)(store.getState()); --> Empty Array
// const bugs = getBugsByUser(1)(store.getState());
// console.log(bugs);
