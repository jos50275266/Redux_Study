# Middleware

- Calling APIs
- Error Reporting
- Analytics
- Authorization

**Log --> Auth (If not, stop processing)** 

Middleware is a piece of code that is executed after an action is dispatched and before it reaches the route reducer.

Redux Toolkit을 이용하면 다음의 Currying 순서를 따른다
SNA = Store --> Next --> Action

위의 설명에서 알 수 있듯이, middleware는 하나의 action이 dispatch 된 이후에 실행되고 (reducer가 실행되기 전 시점)

Dispatch는 Redux Thunk 등을 사용하지 않는 이상 함수를 인자로 전달할 수 없다.
하지만, 아래와 같이 func 라는 middleware 함수를 만들면 따로 store 클래스를 참조하지 않아도 아래와 같이 dispatch를 내부 API 요청 등을 처리하고 호출할 수 있다.

```javascript
const func = ({ dispatch, getState }) => (next) => (action) => {
  // Check the type of action
  if (typeof action === 'function') {
    action(dispatch, getState);
  } else {
    next(action);
  }
};
```
핵심은 
Redux Store를 생성하고 매번 각 action이 dispatch 될 때마다, 이 요청을 보내는 사용자가 권한이 있는지, 혹은 어떤 유형의 store의 데이터 변화 요청이 발생했는지 알리는 등의 여러 견고한 
상태 관리의 과정에서 사용할 수 있다. 마지막으로 가장 중요한 것은 dispatch된 action의 여부를 판단해 reduce를 실행의 여부를 결정하는데 사용할 수 있다는 점이다.
