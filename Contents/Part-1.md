# Redux Part-1

#### Keywords

- Functional Programming
- Writing Clean Code
- Designing Complex Stores
- Middleware
- Calling APIs
- Testing
- Integrating with React

# What is Redux?

 **Definition**: A state management library for JavaScript apps

Redux는 UI(User Interface)를 생성하는데 사용하는 어떤 Library 혹은 Framework와 사용이 가능하다.

![image-20200703193031449](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200703193031449.png)

그렇다면 왜 Redux와 같은 상태 관리 라이브러리(State Management Library)가 필요할까?

굉장히 복잡한 구조의 UI를 설계한다고 생각해보자

이 과정에서 다양한 상황에 직면할 수 있다.

1. **UI**의 각기 다른 부분의 **Sync**를 맞춰야하는 경우

   ![image-20200703193651854](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200703193651854.png)

위 사진의 그림의 UI는 총 5개의 부분으로 나눠져있고. 이 중 하나가 변경되었을때 그 변경된 상태를 UI의 다른 부분에도 반영해줘야하는 상황을 직면하는 상황들이있다. 아래 사진과 같이 모든 부분의 Sync를 맞추기 위해 많은 코드를 작성해야하는 다음과 같이 수고가 발생함을 예측할 수 있다.

- 어떻게 데이터가 서로 상호작용하지?
- 어디서 데이터가 변경되었지?
- 왜 데이터가 의도에따라 반영되지않지?

위와 같은 질문들이 Infinite Loop로 발생할 것이다.

![image-20200703194016259](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200703194016259.png)

앞서 언급한 질문의 Infinite Loop이 발생한다면 당신의 Application이 상태 관리 라이브러리(State Management Library)가 필요한 시점이다. 

![image-20200703224916644](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200703224916644.png)

Redux는 UI의 각 부분의 state의 종류 등을 확장하는 것 대신에 아래 사진 처럼 Central Repository에 모든 state에 저장한다. 이러한 방식을 Single Source of Truth라고 칭한다.

![image-20200703225107058](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200703225107058.png)

한 UI의 각 부분의 각자의 state를 가지는 대신에 아래 사진과 같이 Central Repository로 부터 필요한 것을 가져오기도 하고 state를 갱신하기도 한다. 이 방식을 취함에따라 UI내의 state간의 sync를 보장할 수 있다.

![image-20200703225156707](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200703225156707.png)

결과적으로 아래 사진과 같이 한 곳에서 모든 state를 관리하기 때문에 어느 부분이 어디서 어떻게 왜 문제가 발생했는지 파악하기가 용이해진다.

![image-20200703225322461](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200703225322461.png)

#### Redux

- Centralizes Application's state
- Makes data flow transparent and predictable

# Pros and Cons of Redux

제품을 주문하는 서비스를 제공하는 사이트를 생각해보자.

보통 제품을 주문하는 서비스의 경우 다양한 종류의 제품을 제공해준다. 이때 다양한 카테고리에서 여러 종류의 품목을 장바구니에 담을때 어떤 카테고리의 제품인지 상관없이 장바구니에 담은 제품은 모두 장바구니 탭에 들어갔을때 정상적으로 업데이트 되어있음이 보장되어야하고 또한 삭제했을때도 정상적으로 삭제 되었음을 보장해야한다. 이러한 경우에 Redux(=Central Repository) library를 이용하기에 적합하다. 또한 Redux (=Central Repository)에 정의된 모든 state의 변화가 기록되기 때문에 Time-Travel-Debugging이 가능하다. 

예를 들면, 1 --> 2 --> 3 --> 4 --> 5 순서대로 state를 업데이트했는데 이때 나는 2번 state가 update된 시점으로 돌아가고 싶다 그러면 Redux는 모든 state의 변화를 추적하기 때문에 Time-Travel-Debugging을 이용해 2번 상태로 돌아 갈 수 있게됩니다. 이러한 점을 이용했을때 누군가 당신의 서비스를 사용하던 도중 Redux(= Central Repository)와 관련한 문제가 발생했다는 접수를 받았을 때 그 문제가 발생한 시점을 알면 그때로 돌아가 보다 용이하게 문제(버그)를 해결할 수 있습니다.



### Log Rocket

![image-20200703230826343](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200703230826343.png)

또한 Redux는 preserved된 state를 캐싱하게해줍니다. 앞의 제품 주문 서비스 화면이 처음에 로드되고 다른 화면에 들어갔다가 이전 화면으로 돌아가 새로고침을 눌렀을때 entire application state가 client단의 a single JavaScript Object에 모두 캐싱되기 때문에 서버에 다시 자원을 요청할 필요가 없어집니다.

# Pros

- Predictable state changes
- Centralized state

- Easy debugging
- Preserve page state
- Undo/redo
- Ecosystem of add-ons

# Cons

- Complexity
- Verbosity (write some boilerplate code to get things done)

# Is Redux for You?

#### What problem are you solving?

## When NOT to use Redux

- Tight Budget

- Small to medium-size apps
- Simple UI/data flow
- Static Data

(RES: Redux Everywhere Syndrome)

If you always start with Redux, please read this phrase

**If all you have is a hammer, everything looks like a nail!**

Yes, everything is a nail! No!

### Be an active problem solver

Read This Article - **You might not need Redux**

# Redux Study Structure

- Functional Programming
- Fundamentals of Redux
- Build Redux from scratch
- Debugging
- Writing clean code
- Redux store
- Middleware
- Calling APIs
- Testing Redux apps
- Integration with React









