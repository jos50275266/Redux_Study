import { createSlice } from '@reduxjs/toolkit';

// 1. Create a slice for user { id, name }
let lastId = 0;

// 2. Create an action for adding a user
const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;
