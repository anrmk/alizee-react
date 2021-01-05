import { generateUrl } from "../../../helpers/functions";
import { addFollower } from "../user";

export const CREATE_FOLLOW_REQUEST = "CREATE_FOLLOW_REQUEST";
export const CREATE_FOLLOW_SUCCESS = "CREATE_FOLLOW_SUCCESS";
export const CREATE_FOLLOW_FAILURE = "CREATE_FOLLOW_FAILURE";

function requestCreateFollow() {
  return {
    type: CREATE_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateFollow(followersData, followingsData) {
  return {
    type: CREATE_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      followers: followersData || [],
      followings: followingsData || [],
    },
  };
}

function errorCreateFollow(message) {
  return {
    type: CREATE_FOLLOW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createFollow(api, userId) {
  return async (dispatch, getState) => {
    dispatch(requestCreateFollow());

    try {
      const url = generateUrl("createFollow");
      var { data } = await api.setParams({ id: userId }).query(url);

      const peopleFollowers = [...getState().relationship.followers];
      const personIndex = peopleFollowers.findIndex((item) => item.followId === userId);

      if (personIndex !== -1) {
        peopleFollowers[personIndex]["isFollow"] = true;
      } else {
        peopleFollowers.push(data);
      }

      const peopleFollowings = [...getState().relationship.followings];
      const followingIndex = peopleFollowings.findIndex((item) => item.userId === userId);
      if (followingIndex !== -1) {
        peopleFollowings[followingIndex]["isFollow"] = true;
      } else {
        peopleFollowings.push(data);
      }

      dispatch(addFollower());

      dispatch(receiveCreateFollow(peopleFollowers, peopleFollowings));
    } catch {
      return dispatch(errorCreateFollow("When follow was creating then something went wrong"));
    }
  };
}
