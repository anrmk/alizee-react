export const UPDATE_BLOCKED_SUCCESS = "UPDATE_BLOCKED_SUCCESS";

function receiveBlocked(user) {
  return {
    type: UPDATE_BLOCKED_SUCCESS,
    payload: {
      isFetching: true,
      user,
      errorMessage: "",
    },
  };
}

export function addUserBlock() {
  return (dispatch, getState) => {
    const user = getState().user.data;
    user.isBlocked = true;

    dispatch(receiveBlocked(user));
  };
}

export function removeUserBlock() {
  return (dispatch, getState) => {
    const { user } = getState();
    user.data.isBlocked = false;

    dispatch(receiveBlocked(user));
  };
}
