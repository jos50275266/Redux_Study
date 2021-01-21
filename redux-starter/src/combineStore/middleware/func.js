// This kind of middleware is called "Thunk"
const func = ({ dispatch, getState }) => (next) => (action) => {
  // Check the type of action
  if (typeof action === 'function') {
    action(dispatch, getState);
  } else {
    next(action);
  }
};

export default func;
