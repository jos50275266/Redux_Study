```javascript
const actionCreator = () => (dispatch) => {
    // Call API
    // Resolved: dispatch(success)
    // Rejected: dispatch(error)
}
```
#### Present
- GET_BUGS_REQUEST
- GET_BUGS_SUCCESS
- GET_BUGS_FAIL

#### Past
- bugsRequested
- bugsReceived
- bugsRequestFailed