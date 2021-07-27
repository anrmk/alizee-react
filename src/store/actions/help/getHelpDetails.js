import { generateUrl } from "../../../helpers/functions";

export const GET_HELP_DETAILS_REQUEST = "GET_HELP_DETAILS_REQUEST";
export const GET_HELP_DETAILS_SUCCESS = "GET_HELP_DETAILS_SUCCESS";
export const GET_HELP_DETAILS_FAILURE = "GET_HELP_DETAILS_FAILURE";
export const RESET_CURRENT_DETAILS_HELP = "RESET_CURRENT_DETAILS_HELP";

function requestGetHelpDetails() {
  return {
    type: GET_HELP_DETAILS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetHelpDetails(data) {
  return {
    type: GET_HELP_DETAILS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      helpDetails: data,
    },
  };
}

function errorGetHelpDetails(message) {
  return {
    type: GET_HELP_DETAILS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function resetCurrentHelpDetails() {
  return {
    type: RESET_CURRENT_DETAILS_HELP,
    payload: {
      helpDetails: {},
    },
  };
}

export function getHelpDetail(api, handle) {
  return async (dispatch) => {
    dispatch(requestGetHelpDetails());

    const url = generateUrl("getHelpDetails");
    try {
      const { data } = await api.setMethod("GET").setParams({ name: handle }).query(url);

      dispatch(receiveGetHelpDetails(data));
    } catch {
      dispatch(errorGetHelpDetails("Error: something went wrong"));
    }
  };
}
