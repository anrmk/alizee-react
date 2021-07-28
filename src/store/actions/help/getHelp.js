import { generateUrl } from "../../../helpers/functions";

export const GET_HELP_REQUEST = "GET_HELP_REQUEST";
export const GET_HELP_SUCCESS = "GET_HELP_SUCCESS";
export const GET_HELP_FAILURE = "GET_HELP_FAILURE";
export const RESET_CURRENT_HELP = "RESET_CURRENT_HELP";

function requestGetHelp() {
  return {
    type: GET_HELP_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetHelp(data) {
  return {
    type: GET_HELP_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorGetHelp(message) {
  return {
    type: GET_HELP_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function resetCurrentHelp() {
  return {
    type: RESET_CURRENT_HELP,
    payload: {
      isFetching: false,
      data: [],
      errorMessage: "",
      detailHelp: {},
    },
  };
}

export function getHelp(api) {
  return async (dispatch) => {
    dispatch(requestGetHelp());

    const url = generateUrl("getHelp");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetHelp(data));
    } catch {
      dispatch(errorGetHelp("Error: something went wrong"));
    }
  };
}
