import { generateUrl } from "../../../helpers/functions";

export const UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST = "UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST";
export const UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS = "UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS";
export const UNFOLLOW_PEOPLE_SUGGESTIONS_FAILURE = "UNFOLLOW_PEOPLE_SUGGESTIONS_FAILURE";

function requestDeleteFollow() {
  return {
    type: UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteFollow(data) {
  return {
    type: UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS,
    payload: {
      people: {
        isFetching: false,
        errorMessage: "",
        data
      },
    },
  };
}

function errorDeleteFollow(message) {
  return {
    type: UNFOLLOW_PEOPLE_SUGGESTIONS_FAILURE,
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

      const people = [...getState().suggestion.people.data];
      const personIndex = people.findIndex(item => item.id === userId);
      people[personIndex]["isFollowing"] = false;

      dispatch(receiveDeleteFollow(people));
    } catch (e) {
      return dispatch(errorDeleteFollow(e));
    }
  };
}
