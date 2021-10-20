import {
  FOLLOW_ACCEPTED,
  FOLLOW_PENDING,
} from "../../../constants/follow_types";

export const ADD_FOLLOWER_SUCCESS = "ADD_FOLLOWER_SUCCESS";

function receiveUserFollowerCountIncrement(data) {
  return {
    type: ADD_FOLLOWER_SUCCESS,
    payload: {
      data,
    },
  };
}

export function addFollower(isPrivate, subscriptionPrice) {
  return (dispatch, getState) => {
    const { data } = getState().user;
    data.followersCount += 1;
    data.followStatus =
      isPrivate || subscriptionPrice ? FOLLOW_PENDING : FOLLOW_ACCEPTED;

    dispatch(receiveUserFollowerCountIncrement(data));
  };
}
