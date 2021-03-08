export const ADD_FOLLOWER_SUCCESS = "ADD_FOLLOWER_SUCCESS";

function receiveUserFollowerCountIncrement(data) {
  return {
    type: ADD_FOLLOWER_SUCCESS,
    payload: {
      data,
    },
  };
}

export function addFollower() {
  return (dispatch, getState) => {
    var data = getState().user.data;
    data.followersCount += 1;
    data.isFollow = true;

    dispatch(receiveUserFollowerCountIncrement(data));
  };
}