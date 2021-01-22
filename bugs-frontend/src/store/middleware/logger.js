
// SNA --> Store Next Action
// 이거는 redux/toolkit을 사용할 때만 가능 사용하지 않는 경우는
// logger > toast > api
const logger = (param) => (store) => (next) => (action) => {
    return next(action);
  
};
    
export default logger;
    