import * as actions from "./actionTypes";

let lastId = 0;

export default function reducer(state = [], action) {
  switch (actions.BUG_ADDED) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case action.BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}

// This Reducer is a pure function
// 몇번을 호출하던 동일한 결과값을 리턴
// export default function reducer(state = [], action) {
//   if (action.type === "bugAdded") {
//     return [
//       ...state,
//       {
//         id: ++lastId,
//         description: action.payload.description,
//         resolved: false,
//       },
//     ];
//   } else if (action.type === "bugRemoved") {
//     return state.filter((bug) => bug.id !== action.payload.id);
//   }

//   return state;
// }

// Switch Cases Usage Version
// function reducer(state = [], action) {
//   switch (action.type) {
//     case "bugAdded":
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case "bugRemoved":
//       return state.filter((bug) => bug.id !== action.payload.id);
//     default:
//       return state;
//   }
// }
