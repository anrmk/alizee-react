export const ADD_FOLLOWER_SUCCESS = "ADD_FOLLOWER_SUCCESS";

function receiveUserFollowerCountIncrement(user) {
  return {
    type: ADD_FOLLOWER_SUCCESS,
    payload: {
      isFetching: true,
      user,
      errorMessage: "",
    },
  };
}

export function addFollower() {
  return (dispatch, getState) => {
    var user = getState().user;
    user.data.followersCount += 1;
    user.data.isFollow = true;

    dispatch(receiveUserFollowerCountIncrement(user));
  };
}