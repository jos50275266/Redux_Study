# Redux Architecture

Part-1에서 언급했듯이 Redux는 우리의 application의 state를 A single JavaScript object인 Central Repository에 저장한다. 

![image-20200704143026815](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704143026815.png)

예를 들면, e-commerce app에서 이 Redux를 사용하면 카테고리, 쇼핑 카트, 현재 접속하고 있는 유저 정보와 같은 프로퍼티를 이 Central Repository에 저장할 수 있습니다. 하지만 Redux는 저장한 정보가 카테고리, 쇼핑 카트, 유저 정보 등인지 알지 못한다. 

대신에 arrays, objects, numbers, booleans 값 중 하나라고 인식한다.

```javascript
{
    categories: [],
    products: [],
    cart: {},
    user: {}        
}
```

`Redux`의 `Central Repository`를 이용할 때 우리는 직접 Store(Central Repository)의 데이터를 변경/변화시킬 수 없다. 왜냐하면 `Redux`는 `Functional Programming Principles`의 최상단에 자리 잡고 있기 때문이다. `Functional Programming`에서는 `state `값을 변경할 수 없다. 

그러므로 아래와 같이 코드를 작성할 수 없다. 왜냐하면 우리의 `store(Central Repository)`는 불변성의 객체 `(Immutable Object)`이기 때문이다.

```javascript
store.currentUser = { name: "Mosh" }
```

이 값을 갱신하기 위해서는 반드시 `store`를 함수의 인자로 받고 그 후 받은 인자를 갱신하고 그 갱신한 `store`를 리턴하는 방식을 취해야 한다. 

```javascript
function reducer(store) {
	// return updated store
}
```

위 함수에서는 `spread operator`를 사용해 `a copy of the store`를 생성하거나, `Part-2`에서 언급한 `Immutability Libraries` (**Immutable.js** or **Immer**)를 사용하는 방식을 이용할 수 있다.

```javascript
function reducer(store) {
	const updated = { ...store };
}
```

함수의 이름은 `reducer`인데 여기서 기억해야 할 점은

1. `reducer` 함수는 `the current instance of the store`를 인자 값으로 받고
2. `reducer` 함수는 인자 값으로 받은 `store`의 프로퍼티를 갱신한 후 그 `store`를 리턴해준다.

##### reducer는 어떻게 인자로 받은 store의 어떤 값을 갱신해야 하는지 파악할까?

- 쇼핑카트를 업데이트 해야 할까?
- 카테고리를 업데이트 해야 할까?

```javascript
function reducer(store) {
	const updated = { ...store };
	updated.currentUser = ???
    updated.categories = ???
    updated.cart = ???
}
```

인자로 받은 `store`의 값 중 어떤 값을 갱신해야 하는지 파악하기 위해 `reducer`는 두 번째 인자로 `action`이라는 `a plain JavaScript object`를 받는다. 이 `Object`는 `store`에 무슨 일이 발생할지를 설명해준다. 

예를 들면

- 쇼핑카트를 업데이트해라
- 카테고리를 업데이트해라

```javascript
function reducer(store, action) {
	const updated = { ...store };
	updated.products = ???
}
```

`action`에 정의된 형태에 기반을 두고 `Reducer`는 어떤 프로퍼티를 갱신해야 하는지 알 수 있다. 즉 모든 갱신은 `a single function`에서 발생한다. 실제로 `Redux`를 사용할 때 다수의 `slice (reduce)`를 이용할 수 있다. 각 `Reducer`는 `Central Repository`의 특정 프로퍼티를 갱신하는 역할을 한다. 비유를 들자면 다수의 부서가 존재하는 조직을 생각해보자. 각 조직은 매니저가 있고 이 매니저는 자기가 속한 조직을 책임져야 하고 자기가 속한 조직을 제외한 다른 조직은 책임지지 않는다. 그 이유는 각 조직을 책임지는 매니저가 있기 때문이다.

```javascript
{
	categories: [],
	products: [],
	cart: {},
	user: {}
}
```

![image-20200704150618531](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704150618531.png)

**Store**: 우리의 `App`의 `state`를 포함하고 있는 `a single plain JavaScript Object`

**Actions**: 우리의 `App`에서 `state`와 관련해서 무슨 일이 발생하는지를 나타내는 `plain JavaScript Objects`이다. 이것을 `Event`라 생각해도 된다. 그 이유는 프로그래밍에서 한 `event`는 무슨 일이 발생한지를 나타내기 때문이다. 

**Reducers**: 만약 `store`에 4개의 프로퍼티가 존재한다면 각각의 프로퍼티의 갱신을 담당하는 4개의 `reducer`가 필요하다. 여기서 `Reducer`를 `Event Handler or Processors`라고 생각해도 된다. 하지만 `Event Handler` 대신에 `Reducer`라고 부르는 이유는 `Event Handler`는 일반적으로 `Object Mutation`가 관련이 있는데 `Redux`에서는 `Immutability` 보장을 위해 `Object Mutation`을 하지 않기 때문이다. 이 `Reducer`는 `Pure Function`이다. 

그래서 이 `Pure Function`은 `Global State`에 미치지 않고 또한 인자값으로 받은 `Object`를 변경/변화시키지 않는다 (Original Object에 변화를 주지 않음을 의미한다). 그리고 이러한 특성한 `Side Effects`를 가지지 않음을 보장한다. 

![image-20200704151728252](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704151728252.png)

### 그러면 어떻게 Action - Store - Reducer가 함께 동작할까?

1. 사용자가 `state` 갱신에 관한 한 행위`(action)`를 수행한다 (쇼핑카트에 한 요소를 추가하는 행위). `Action Object`를 생성해 `Store Object`가 가지고 있는 `Dispatch method`의 인자값으로 `Action Object`를 전달한다.
2. `Store`의 `Dispatch method`에 인자로 전달된 `Action Object`와 함께 `Reducer`를 호출하는 역할을 한다.
3. `Store`가 `Reducer method`를 호출하고 그 이후 `reducer`는 `store(original) object + action object`를 가지고 갱신된 부분을 확인하고 `new state(새로운 상태)`를 `store`로 리턴해준다. 결과적으로 `Store`에는 갱신된 `state`가 내부적으로 다시 저장된다.
4. 이 갱신된 `state`를 기반으로 `Update`에 관한 `UI Components`에게 알림을 주고 그 값을 갱신한다.

![image-20200704152719773](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200704152719773.png)

##### 왜 Redux는 store의 entry-point로써 dispatch action의 방식을 이용한 것일까?

`Dispatch`는 `an entry point to our store`라 생각할 수 있다. `Dispatch`를 통해 근본적으로 모든 `action`을 같은 `entry point`에 전달할 수 있다. 또한 사용자가 `Action`을 발생시킬 때마다 해당 `action`에 따라 어떤 처리를 해야 하는지를 관리하는 `Central Place`가 있고 이것을 통해 매번 `Action`이 발생 시 로깅과 같은 알림을 나타낼 수 있다. 또한 이러한 방식 때문에 쉽게 `Undo/Redo`가 가능하다.



나의 말로 요약:
`Dispatch`의 존재를 실생활에 묘사하면 다음과 같다.

손님 --> 직원 --> 포스기 --> 요리사

손님이 주문하고 이 직원이 주문을 받는 과정까지가 `Action or Event`의 발생이다

그 후 직원이 바로 요리사에게 전달해도 되지만 이렇게 하면 식당의 관점에서 두 가지 문제가 생긴다. 

1. 기록 없이 말로 전달하기 때문에 직원이 주문을 잘못할 수 있다.
2. 기록 없이 말로 전달해서 요리사가 주문 내역을 까먹을 수 있다.

하지만 포스기를 배치함으로써 내가 똑바로 주문을 받았는지 한 번더 확인할 수 있고 또한 포스기를 통해 주문한 내용이 영수증 형식으로 요리사에게 전달되기 때문에 요리사 또한 주문 내역을 보고 음식 조리시 기억에 의존하지 않아도 된다. 또한 주문이 잘못 들어갔을 때 빠르게 포스기의 주문 내역을 변경해 요리사가 요리를 시작하기 전에 주문을 변경할 수 있다. 

여기서 포스기의 역할이 바로 `Redux`에서 `Dispatch `방식을 이용하는 이유라고 이해했다.











