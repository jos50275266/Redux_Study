import { combineReducers } from 'redux';
import bugsReducer from '../store/bugs.js';
import projectsReducer from '../projectStore/projects.js';
import usersReducer from '../userStore/users.js';

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer,
});
