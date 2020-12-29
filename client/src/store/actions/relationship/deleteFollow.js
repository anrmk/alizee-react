import { generateUrl } from "../../../helpers/functions";

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

function receiveDeleteFollow(followers) {
  return {
    type: DELETE_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      followers: followers || [],
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

      console.log("deleteFollow", userId)

      const people = [...getState().relationship.followers];
      const personIndex = people.findIndex(item => item.userId === userId);
      people[personIndex]["isFollowing"] = false;

      dispatch(receiveDeleteFollow(people));
    } catch (e) {
      return dispatch(errorDeleteFollow("When follow was deleting then something went wrong"));
    }
  };
}
