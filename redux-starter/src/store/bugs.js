import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from "../combineStore/api";
import moment from 'moment';

// const bugAdded = createAction('bugAdded');
// const bugResolved = createAction('bugResolved');
// const bugRemoved = createAction('bugRemoved');

// Action Types
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// Action Creators

// export const bugAdded = description => ({
//     type: BUG_ADDED,
//     payload: {
//         description
//     }
// });

// export const bugRemoved = id => ({
//     type: BUG_REMOVED,
//     payload: {
//         id
//     }
// });

// export const bugResolved = id => ({
//     type: BUG_RESOLVED,
//     payload: {
//         id
//     }
// });

// export default createReducer([], {
//   // Key: Value
//   // actions: functions (event => event handler)
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },

//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//   },

//   // No longer worry about this default case
// });

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];

//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);

//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//       );

//     default:
//       return state;
//   }
// }

// reducer
// let lastId = 0;

// this slice will automatically create an action and reducer for us
// 자동으로 action, reducer를 mapping 해주기 때문에 [bugAdded.type]의 방식을 사용하지 않아도 된다.
const slice = createSlice({
  name: 'bugs',

  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },

  reducers: {
    bugRequested: (bugs, action) => {
      bugs.loading = true;
    },

    // bugs/bugReceived
    bugReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    // actions => action handlers
    // action과 action handlers를 mapping 해주는 역할을 한다
    // command - event
    // addBug - bugAdded
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    // resolveBug bugResolved (event)
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

console.log(slice);

// This is an implementation detail
// export const { 
//   bugAdded, // addBug
//   bugResolved, 
//   bugAssignedToUser, 
//   bugReceived, 
//   bugRequested, 
//   bugRequestFailed
// } = slice.actions;

// 오직 addBug or resolveBug 등의 메소도로만 접근할 수 있게 만들어야한다.
// Reducing Coupling
const { 
  bugAdded, // addBug
  bugResolved, 
  bugAssignedToUser, 
  bugReceived, 
  bugRequested, 
  bugRequestFailed
} = slice.actions;

export default slice.reducer;

// Action Creators - UI Layer - This is too defailed to write down on UI Layer - Use Encapsulation
const url = "/bugs";

// () => fn(dispatch, getState)
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  console.log('dffIn', diffInMinutes);
  // How long Caching will be vaild
  if (diffInMinutes < 10) return;

  console.log(lastFetch);

  dispatch(apiCallBegan({
    url,
    onStart: bugRequested.type,
    onSuccess: bugReceived.type,
    onError: bugRequestFailed.type
  }));
};

export const addBug = bug => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type,
});

export const resolveBug = id => apiCallBegan({
  url: url + '/' + id,
  method: "patch", // PATCH /bugs/1,
  data: { resolved: true },
  onSuccess: bugResolved.type 
});

export const assignBugToUser = (bugId, userId) => apiCallBegan({
  url: url + '/' + bugId,
  method: 'patch',
  data: { userId },
  onSuccess: bugAssignedToUser.type
})

// export const loadBugs = () => 
//   apiCallBegan({
//     url,
//     onStart: bugRequested.type,
//     onSuccess: bugReceived.type,
//     onError: bugRequestFailed.type
// });

// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

// Selector - Encapsulation
// 매번 새로운 Array를 리턴한다는 문제가 있다.
// Memoization
// bugs => get unresolved bugs from the cache

// Memoization
// f(x) => y { input: 1, output: 2}
// bugs가 변경되지 않았다면 bugs ==> get unrsolved bugs from the cache한다
// 만약 변했다면 두 번째 인자인 콜백 함수를 실행한다.
// 값 변화의 기준은 dispatch가 발생했는지 안했는지 검사하는 과정에서 변화하는 state 값을 추적하면된다
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
);

// One of Cohesion rules in Programming
// Highly Related Factors should be together