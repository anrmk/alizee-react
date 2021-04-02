export const REMOVE_BLOCKED_SUCCESS = "REMOVE_BLOCKED_SUCCESS";

function receiveBlocked(user) {
  return {
    type: REMOVE_BLOCKED_SUCCESS,
    payload: {
      isFetching: true,
      user,
      errorMessage: "",
    },
  };
}

export function removeBlocked() {
  return (dispatch, getState) => {
    var user = getState().user;
    user.data.isBlocked = false;

    dispatch(receiveBlocked(user));
  };
}
