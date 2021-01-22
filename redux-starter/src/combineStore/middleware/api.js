import axios from 'axios';
import * as actions from '../api.js';

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  // next() == dispatch
  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  // apiCallBegan
  next(action);

  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url, // /bugs
      method,
      data,
    });

    // General Success
    dispatch(actions.apiCallSuccess(response.data));

    console.log('onSuccess', onSuccess);
    console.log('payload', response.data);
    // Specific Success
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General Error
    dispatch(actions.apiCallFailed(error.message));

    // Specific Error
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
