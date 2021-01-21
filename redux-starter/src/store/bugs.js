import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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
let lastId = 0;

// this slice will automatically create an action and reducer for us
// 자동으로 action, reducer를 mapping 해주기 때문에 [bugAdded.type]의 방식을 사용하지 않아도 된다.
const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    // actions => action handlers
    // action과 action handlers를 mapping 해주는 역할을 한다
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
  },
});

console.log(slice);

export const { bugAdded, bugResolved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

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
