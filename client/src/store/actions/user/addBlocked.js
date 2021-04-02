export const ADD_BLOCKED_SUCCESS = "ADD_BLOCKED_SUCCESS";

function receiveBlocked(user) {
  return {
    type: ADD_BLOCKED_SUCCESS,
    payload: {
      isFetching: true,
      user,
      errorMessage: "",
    },
  };
}

export function addBlocked() {
  return (dispatch, getState) => {
    var user = getState().user;
    user.data.isBlocked = true;

    dispatch(receiveBlocked(user));
  };
}