import { generateUrl, generateFileUrl } from "../../../helpers/functions";

export const GET_PEOPLE_SUGGESTIONS_REQUEST = "GET_PEOPLE_SUGGESTIONS_REQUEST";
export const GET_PEOPLE_SUGGESTIONS_SUCCESS = "GET_PEOPLE_SUGGESTIONS_SUCCESS";
export const GET_PEOPLE_SUGGESTIONS_FAILURE = "GET_PEOPLE_SUGGESTIONS_FAILURE";

function requestGetPeople() {
  return {
    type: GET_PEOPLE_SUGGESTIONS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPeople(data) {
  return {
    type: GET_PEOPLE_SUGGESTIONS_SUCCESS,
    payload: {
      people: {
        data,
        isFetching: false,
        errorMessage: "",
      }
    },
  };
}

function errorGetPeople(message) {
  return {
    type: GET_PEOPLE_SUGGESTIONS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    },
  };
}

export function getPeople(api, count) {
  return async (dispatch) => {
    dispatch(requestGetPeople());

    try {
      const url = generateUrl("getPeopleSuggestions");

      const { data } = await api
        .setMethod("GET")
        .setParams({ length: count })
        .query(url);

      data.forEach(item => {
        item.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl);
      })

      dispatch(receiveGetPeople(data));
    } catch (e) {
      dispatch(errorGetPeople("Error: something went wrong:", e));
    }
  };
}
