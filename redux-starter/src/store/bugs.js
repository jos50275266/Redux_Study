import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from "../combineStore/api";
import axios from "axios";
import moment from 'moment';

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

    bugReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now()
    },

    bugRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    }
  }
});

// test 목적으로 잠시 export 붙이기
export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugReceived,
  bugRequested,
  bugRequestFailed
} = slice.actions;

export default slice.reducer;

const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  console.log('dffIn', diffInMinutes);
  // How long Caching will be vaild
  if (diffInMinutes < 10) return;

  console.log(lastFetch);

  return dispatch(apiCallBegan({
    url,
    onStart: bugRequested.type,
    onSuccess: bugReceived.type,
    onError: bugRequestFailed.type
  }));
}

// It works
// export const addBug = bug => async dispatch => {
//   const response = await axios.request({
//     baseURL: 'http://localhost:9001/api',
//     url: '/bugs',
//     method: 'post',
//     data: bug
//   });

//   dispatch(bugAdded(response.data));
// }

// make an api call
// promise resolved => dispatch(success)
// export const addBug = async bug => {
//   try {
//     const response = axios.post(url, bug);
//     dispatch(bugAdded(bug));
//   } catch (error) {
//     dispatch({ type: 'error'});
//   }
// }

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
});

export const getUnresolvedBugs = 
  createSelector(
    (state) => state.entities.bugs,
    (state) => state.entities.projects,
    (bugs, projects) => bugs.list.filter((bug) => !bug.resolved)
);


export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
);
