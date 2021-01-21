// Log every action being dispatched

// SNA --> Store Next Action
// 이거는 redux/toolkit을 사용할 때만 가능 사용하지 않는 경우는
const logger = (param) => (store) => (next) => (action) => {
  console.log('Logging', param);
  //   console.log('store', store);
  //   console.log('next', next);
  //   console.log('action', action);
  next(action);
};

// const logger = ({ getState, dispatch }) => (next) => (action) => {
//     console.log('store', store);
//     console.log('next', next);
//     console.log('action', action);

//     next(action);
// };

export default logger;

// Currying
// N => 1 =>
