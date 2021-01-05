export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";

function receiveUserFollowerCountDecrement(user) {
  return {
    type: REMOVE_FOLLOWER_SUCCESS,
    payload: {
      isFetching: true,
      user,
      errorMessage: "",
    },
  };
}

export function removeFollower() {
  return (dispatch, getState) => {
    var user = getState().user;
    user.data.followersCount -= 1;
    user.data.isFollow = false;

    dispatch(receiveUserFollowerCountDecrement(user));
  };
}
