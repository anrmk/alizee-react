import { generateUrl } from "../../../helpers/functions";

export const GET_SUGGESTIONS_PEOPLE_REQUEST = "GET_SUGGESTIONS_PEOPLE_REQUEST";
export const GET_SUGGESTIONS_PEOPLE_SUCCESS = "GET_SUGGESTIONS_PEOPLE_SUCCESS";
export const GET_SUGGESTIONS_PEOPLE_FAILURE = "GET_SUGGESTIONS_PEOPLE_FAILURE";
export const RESET_SUGGESTIONS_PEOPLE = "RESET_SUGGESTIONS_PEOPLE";

function requestGetSuggestionPeople() {
  return {
    type: GET_SUGGESTIONS_PEOPLE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetSuggestionPeople(data) {
  return {
    type: GET_SUGGESTIONS_PEOPLE_SUCCESS,
    payload: {
      data,
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorGetSuggestionPeople(message) {
  return {
    type: GET_SUGGESTIONS_PEOPLE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function resetSuggestionPeople() {
  return (dispatch) =>
    dispatch({
      type: RESET_SUGGESTIONS_PEOPLE,
      payload: {
        isFetching: false,
        data: [],
        errorMessage: "",
      },
    });
}

export function getSuggestionPeople(api, count) {
  return async (dispatch) => {
    dispatch(requestGetSuggestionPeople());

    try {
      const url = generateUrl("getPeopleSuggestions");
      const { data } = await api
        .setMethod("GET")
        .setParams({ length: count })
        .query(url);

      dispatch(receiveGetSuggestionPeople(data));
    } catch (e) {
      dispatch(errorGetSuggestionPeople("Error: something went wrong:", e));
    }
  };
}
