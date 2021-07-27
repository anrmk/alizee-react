import { generateUrl } from "../../../helpers/functions";

export const GET_BANK_REQUEST = "GET_BANK_REQUEST";
export const GET_BANK_SUCCESS = "GET_BANK_SUCCESS";
export const GET_BANK_FAILURE = "GET_BANK_FAILURE";

function requestGetBank() {
  return {
    type: GET_BANK_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetBank(data) {
  return {
    type: GET_BANK_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetBank(message) {
  return {
    type: GET_BANK_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getBank(api) {
  return async (dispatch) => {
    dispatch(requestGetBank());

    const url = generateUrl("getBank");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetBank(data));
    } catch (e) {
      dispatch(errorGetBank("Error: something went wrong:", e));
    }
  };
}
