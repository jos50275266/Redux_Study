import axios from 'axios';
import * as actions from '../api.js';

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  // next() == dispatch
  //   next(action);

  const { url, method, data, onSuccess, onError } = action.payload;

  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url, // /bugs
      method,
      data,
    });

    // General Success
    dispatch(actions.apiCallSuccess(response.data));

    // Specific Success
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General Error
    dispatch(actions.apiCallFailed(error));

    // Specific Error
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
