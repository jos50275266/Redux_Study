import { combineReducers } from 'redux';
import entitiesReducer from './entities';

/**
 * entities
 *   - bugs
 *   - projects
 */
export default combineReducers({
  entities: entitiesReducer,
});
