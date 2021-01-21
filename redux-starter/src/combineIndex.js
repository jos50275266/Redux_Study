import configureStore from './combineStore/configureStore.js';
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsByUser,
} from './store/bugs.js';
import { projectAdded } from './projectStore/projects.js';
import { userAdded } from './userStore/users.js';

const store = configureStore();

store.subscribe(() => {
  console.log('Store Changed...');
});

store.dispatch(userAdded({ name: 'user 1' }));
store.dispatch(userAdded({ name: 'user 2' }));
store.dispatch(projectAdded({ name: 'Project 1' }));
store.dispatch(bugAdded({ description: 'Bug 1' }));
store.dispatch(bugAdded({ description: 'Bug 2' }));
store.dispatch(bugAdded({ description: 'Bug 3' }));
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugResolved({ id: 1 }));

// 매번 새로운 Array를 리턴한다 는 문제가 있다.
// const unresolvedBugs = getUnresolvedBugs(store.getState());

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());

// React에서는 state가 변했을때 re-render가 발생하는데
// state에 변화가 없음에도 getUnresolvedBugs와 같은 Expensive Operation을 사용하는 것은 비효율적이다.

// Memoization을 이용했을시 true를 리턴한다
console.log(x == y);
console.log(x);
console.log(y);

const bugs = getBugsByUser(1)(store.getState());
console.log(bugs);

// Memoization - Optimizing An Expensive Function
// f(x) => y   { input: 1, output: 2 }
// Next time we call this function, before we call this function, we check if the state is changed
// bugs ==> get unresolved bugs from the cache
