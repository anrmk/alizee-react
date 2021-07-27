export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";

function receiveUserFollowerCountDecrement(data) {
  return {
    type: REMOVE_FOLLOWER_SUCCESS,
    payload: {
      data,
    },
  };
}

export function removeFollower() {
  return (dispatch, getState) => {
    var data = getState().user.data;

    if (data.followersCount !== 0) {
      data.followersCount -= 1;
    }
    data.isFollow = false;
    data.followStatus = null;

    dispatch(receiveUserFollowerCountDecrement(data));
  };
}
