import configureStore from './combineStore/configureStore.js';
import * as actions from './combineStore/api.js';

const store = configureStore();

store.dispatch(
  actions.apiCallBegan({
    url: '/bugs',
    onSuccess: actions.apiCallSuccess.type,
  })
);

// store.dispatch({
//   type: 'apiCallBegan', // apiRequest
//   payload: {
//     url: '/bugs',
//     onSuccess: 'bugsReceived',
//     onError: 'apiRequestFailed',
//   },
// });
