import { generateFileUrl, generateUrl, isEmptyObject } from "../../../helpers/functions";

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
      receipt
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

export function getReceipt(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestReceiptPost());
    
    const url = generateUrl("getReceipt");
    try {
      const { data } = await api.setMethod("GET").setParams({ id }).query(url);
      data.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, data.avatarUrl);

      dispatch(receiveReceiptPost(data));
    } catch (e) {
      dispatch(errorReceiptPost("Error: something went wrong"));
    }
  };
}
