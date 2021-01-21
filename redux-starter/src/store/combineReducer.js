import { combineReducer } from 'redux';
import bugsReducer from './bugs.js';
import projectReducer from '../projectStore/projects';

export default combineReducer({
  bugs: bugsReducer,
  projects: projectReducer,
});
