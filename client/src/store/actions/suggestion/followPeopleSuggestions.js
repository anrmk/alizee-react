import { generateUrl } from "../../../helpers/functions";

export const FOLLOW_PEOPLE_SUGGESTIONS_REQUEST = "FOLLOW_PEOPLE_SUGGESTIONS_REQUEST";
export const FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS = "FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS";
export const FOLLOW_PEOPLE_SUGGESTIONS_FAILURE = "FOLLOW_PEOPLE_SUGGESTIONS_FAILURE";

function requestFollowPeopleSuggestions() {
  return {
    type: FOLLOW_PEOPLE_SUGGESTIONS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveFollowPeopleSuggestions(data) {
  return {
    type: FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      status: 200,
      data
    },
  };
}

function errorFollowPeopleSuggestions(message) {
  return {
    type: FOLLOW_PEOPLE_SUGGESTIONS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function followPeopleSuggestions(api, userId) {
  return async (dispatch) => {
    dispatch(requestFollowPeopleSuggestions());

    const url = generateUrl("followPeopleSuggestions");
    try {
      const {data} = await api.setParams({ id: userId }).query(url);

      dispatch(receiveFollowPeopleSuggestions(Object.assign({}, data, {userId, isFollowing: true})))
    } catch (e) {
      return dispatch(errorFollowPeopleSuggestions(e));
    }
  };
}
