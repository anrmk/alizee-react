import { generateUrl } from "../../../helpers/functions";

export const RECEIPT_POST_REQUEST = "RECEIPT_POST_REQUEST";
export const RECEIPT_POST_SUCCESS = "RECEIPT_POST_SUCCESS";
export const RECEIPT_POST_FAILURE = "RECEIPT_POST_FAILURE";

function requestReceiptPost() {
  return {
    type: RECEIPT_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveReceiptPost(receipt) {
  return {
    type: RECEIPT_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      receipt,
    },
  };
}

function errorReceiptPost(message) {
  return {
    type: RECEIPT_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getReceipt(api, id, callback) {
  return async (dispatch, getState) => {
    dispatch(requestReceiptPost());

    const url = generateUrl("getReceipt");
    try {
      const { data } = await api.setMethod("GET").setParams({ id }).query(url);

      dispatch(receiveReceiptPost(data));
      callback && callback(data); // TODO: refactor this, we can't directly pass data in callback
    } catch (e) {
      dispatch(errorReceiptPost("Error: something went wrong"));
    }
  };
}
