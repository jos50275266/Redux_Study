// currying
// N => I

// SNA = Store Next Action
const logger = (param) => (store) => (next) => (action) => {
  console.log("Logging", param);
  //   console.log("store", store);
  //   console.log("next", next);
  //   console.log("action", action);
  //    dispatch(action.something)
  next(action);
};

// const logger = ({ getState, dispatch }) => next =>  action => {

// }

export default logger;
