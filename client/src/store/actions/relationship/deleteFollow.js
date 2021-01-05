import { generateUrl } from "../../../helpers/functions";
import { removeFollower } from "../user";

export const DELETE_FOLLOW_REQUEST = "DELETE_FOLLOW_REQUEST";
export const DELETE_FOLLOW_SUCCESS = "DELETE_FOLLOW_SUCCESS";
export const DELETE_FOLLOW_FAILURE = "DELETE_FOLLOW_FAILURE";

function requestDeleteFollow() {
  return {
    type: DELETE_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteFollow(followers, followings) {
  return {
    type: DELETE_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      followers: followers || [],
      followings: followings || [],
    },
  };
}

function errorDeleteFollow(message) {
  return {
    type: DELETE_FOLLOW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteFollow(api, userId) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteFollow());

    try {
      const url = generateUrl("deleteFollow");
      await api.setMethod("DELETE").setParams({ id: userId }).query(url);

      const peopleFollowers = [...getState().relationship.followers];
      const followerIndex = peopleFollowers.findIndex((item) => item.followId === userId);
      if (followerIndex !== -1) {
        peopleFollowers[followerIndex]["isFollow"] = false;
      }

      const peopleFollowings = [...getState().relationship.followings];
      const followingIndex = peopleFollowings.findIndex((item) => item.userId === userId);
      if (followingIndex !== -1) {
        peopleFollowings[followingIndex]["isFollow"] = false;
      }

      dispatch(removeFollower());
      dispatch(receiveDeleteFollow(peopleFollowers, peopleFollowings));
    } catch (e) {
      return dispatch(errorDeleteFollow("When follow was deleting then something went wrong"));
    }
  };
}
