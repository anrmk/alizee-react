import { FOLLOW_ACCEPTED, FOLLOW_PENDING } from "../../../constants/follow_types";

export const ADD_FOLLOWER_SUCCESS = "ADD_FOLLOWER_SUCCESS";

function receiveUserFollowerCountIncrement(data) {
  return {
    type: ADD_FOLLOWER_SUCCESS,
    payload: {
      data,
    },
  };
}

export function addFollower(isPrivateAccount) {
  return (dispatch, getState) => {
    var data = getState().user.data;
    data.followersCount += 1;
    data.isFollow = true;
    data.followStatus = isPrivateAccount ? FOLLOW_PENDING : FOLLOW_ACCEPTED;

    dispatch(receiveUserFollowerCountIncrement(data));
  };
}