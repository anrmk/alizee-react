import { generateUrl } from "../../../helpers/functions";

export const DELETE_HELP_RATING_REQUEST = "DELETE_HELP_RATING_REQUEST";
export const DELETE_HELP_RATING_SUCCESS = "DELETE_HELP_RATING_SUCCESS";
export const DELETE_HELP_RATING_FAILURE = "DELETE_HELP_RATING_FAILURE";

function requestDeleteHelpRating() {
  return {
    type: DELETE_HELP_RATING_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteHelpRating() {
  return {
    type: DELETE_HELP_RATING_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      isVoted: true,
    },
  };
}

function errorDeleteHelpRating(message) {
  return {
    type: DELETE_HELP_RATING_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteHelpRating(api, id) {
  return async (dispatch) => {
    dispatch(requestDeleteHelpRating());

    const url = generateUrl("changeHelpRating");
    try {
      await api.setMethod("DELETE").setParams({ id }).query(url);

      dispatch(receiveDeleteHelpRating());
    } catch {
      dispatch(errorDeleteHelpRating("Error: something went wrong"));
    }
  };
}
