import configureStore from './projectStore/store';
import { projectAdded } from './projectStore/projects';

const store = configureStore();

store.subscribe(() => {
  console.log('Store Changed!', store.getState());
});

store.dispatch(projectAdded({ name: 'name 1' }));
store.dispatch(projectAdded({ name: 'name 2' }));
store.dispatch(projectAdded({ name: 'name 3' }));

console.log(store.getState());
