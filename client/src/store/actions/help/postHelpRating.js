import { generateUrl } from "../../../helpers/functions";

export const POST_HELP_RATING_REQUEST = "POST_HELP_RATING_REQUEST";
export const POST_HELP_RATING_SUCCESS = "POST_HELP_RATING_SUCCESS";
export const POST_HELP_RATING_FAILURE = "POST_HELP_RATING_FAILURE";

function requestPostHelpRating() {
  return {
    type: POST_HELP_RATING_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receivePostHelpRating() {
  return {
    type: POST_HELP_RATING_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      isVoted: true,
    },
  };
}

function errorPostHelpRating(message) {
  return {
    type: POST_HELP_RATING_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createHelpRating(api, id) {
  return async (dispatch) => {
    dispatch(requestPostHelpRating());

    const url = generateUrl("changeHelpRating");
    try {
      await api.setMethod("POST").setParams({ id }).query(url);

      dispatch(receivePostHelpRating());
    } catch {
      dispatch(errorPostHelpRating("Error: something went wrong"));
    }
  };
}
