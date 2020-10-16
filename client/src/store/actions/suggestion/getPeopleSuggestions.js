import { generateUrl } from "../../../helpers/functions";

export const GET_PEOPLE_SUGGESTIONS_REQUEST = "GET_PEOPLE_SUGGESTIONS_REQUEST";
export const GET_PEOPLE_SUGGESTIONS_SUCCESS = "GET_PEOPLE_SUGGESTIONS_SUCCESS";
export const GET_PEOPLE_SUGGESTIONS_FAILURE = "GET_PEOPLE_SUGGESTIONS_FAILURE";

function requestGetPeopleSuggestions() {
  return {
    type: GET_PEOPLE_SUGGESTIONS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPeopleSuggestions(peopleData) {
  return {
    type: GET_PEOPLE_SUGGESTIONS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      people: peopleData || [],
    },
  };
}

function errorGetPeopleSuggestions(message) {
  return {
    type: GET_PEOPLE_SUGGESTIONS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    },
  };
}

export function getPeopleSuggestions(api, count) {
  return async (dispatch) => {
    dispatch(requestGetPeopleSuggestions());

    const url = generateUrl("getPeopleSuggestions");
    try {
      const { status, data } = await api.setMethod("GET").setParams({count}).query(url);

      if (status !== 200) {
        return dispatch(errorGetPeopleSuggestions(data?.message));
      }

      dispatch(receiveGetPeopleSuggestions(data));
    } catch {
      dispatch(errorGetPeopleSuggestions("Error: GetSuggestions"));
    }
  };
}
