import { generateUrl } from "../../../helpers/functions";

export const UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST = "UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST";
export const UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS = "UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS";
export const UNFOLLOW_PEOPLE_SUGGESTIONS_FAILURE = "UNFOLLOW_PEOPLE_SUGGESTIONS_FAILURE";

function requestUnfollowPeopleSuggestions() {
  return {
    type: UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
} 

function receiveUnfollowPeopleSuggestions(data) {
  return {
    type: UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      status: 200,
      data
    },
  };
}

function errorUnfollowPeopleSuggestions(message) {
  return {
    type: UNFOLLOW_PEOPLE_SUGGESTIONS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function unfollowPeopleSuggestions(api, userId) {
  return async (dispatch) => {
    dispatch(requestUnfollowPeopleSuggestions());

    const url = generateUrl("followPeopleSuggestions");
    try {
      const { data } = await api.setMethod("DELETE").setParams({ id: userId }).query(url);

      dispatch(receiveUnfollowPeopleSuggestions(Object.assign({}, data, {userId, isFollowing: false})));
    } catch (e) {
      return dispatch(errorUnfollowPeopleSuggestions(e));
    }
  };
}
