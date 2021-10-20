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
    const { data } = getState().user;

    if (data.followersCount !== 0) {
      data.followersCount -= 1;
    }
    data.followStatus = 0;

    dispatch(receiveUserFollowerCountDecrement(data));
  };
}
