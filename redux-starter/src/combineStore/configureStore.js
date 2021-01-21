import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from './middleware/logger.js';
import reducer from './reducer.js';
import func from './middleware/func.js';
import toast from './middleware/toast.js';
import api from './middleware/api';

// redux/toolkit에서 func (thunk)의 기능을 제공한다 이것을 사용해보자
// export default function () {
//   // middleware 함수의 순서는 중요하다
//   return configureStore({
//     reducer,
//     middleware: [logger({ destination: 'Console' }), func],
//   });
// }

// Redux/Toolkit이 자동으로 Redux Thunk를 가져와 적용하는 것을 확인할 수 있다
export default function () {
  // middleware 함수의 순서는 중요하다
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: 'Console' }),
      toast,
      api,
    ],
  });
}

// middleware: [logger("console")]
// 위와 같이 Parameterizing Middleware를 하면 문제가 발생한다
// S N A ==> store가 console이 되기 때문이다
// 이 문제를 해결하기 위해 추가적인 param을 줄 수 있다 Currying 하나 더 추가
// const logger = param => store => next => action => {}
