import { generateUrl } from "../../../../helpers/functions";

export const GET_PAYMENTS_REQUEST = "GET_PAYMENTS_REQUEST";
export const GET_PAYMENTS_SUCCESS = "GET_PAYMENTS_SUCCESS";
export const GET_PAYMENTS_FAILURE = "GET_PAYMENTS_FAILURE";

function requestGetPayments() {
  return {
    type: GET_PAYMENTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPayments(data) {
  return {
    type: GET_PAYMENTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetPayments(message) {
  return {
    type: GET_PAYMENTS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getPayments(api) {
  return async (dispatch) => {
    dispatch(requestGetPayments());

    const url = generateUrl("getPayments");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetPayments(data));
    } catch (e) {
      dispatch(errorGetPayments("Error: something went wrong:", e));
    }
  };
}
