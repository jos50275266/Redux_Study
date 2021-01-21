import { createAction, createReducer} from "@reduxjs/toolkit";

const bugAdded = createAction("bugAdded");
const bugResolved = createAction("bugResolved");
const bugRemoved = createAction("bugRemoved");


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

// reducer
let lastId = 0;

createReducer([], {
    // Key: Value
    // actions: functions (event => event handler)
    bugAdded: (bugs, action) => {
        bugs.push({ 
            id: ++lastId, 
            description: action.payload.description, 
            resolved: false
        });
    },

    bugResolved: (state, action) => {
        const index = state.findIndex(bug => bug.id === action.payload.id);
        state[index].resolved = 
    }
});

export default function reducer(state = [], action) {
    switch (action.type) {
        case bugAdded.type:
            return [
                ...state, 
                { 
                    id: ++lastId, 
                    description: action.payload.description, 
                    resolved: false
                }
            ];
            
        case bugRemoved.type:
            return state.filter(bug => bug.id !== action.payload.id);

        case bugResolved.type:
            return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true });
    
        default:
            return state;
    }
}