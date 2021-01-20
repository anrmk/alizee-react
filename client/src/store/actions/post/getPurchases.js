import { generateFileUrl, generateUrl, isEmptyObject } from "../../../helpers/functions";

export const PURCHASE_POST_REQUEST = "PURCHASE_POST_REQUEST";
export const PURCHASE_POST_SUCCESS = "PURCHASE_POST_SUCCESS";
export const PURCHASE_POST_FAILURE = "PURCHASE_POST_FAILURE";

function requestPurchasePost() {
  return {
    type: PURCHASE_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receivePurchasePost(purchases) {
  return {
    type: PURCHASE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      purchases,
    },
  };
}

function errorPurchasePost(message) {
  return {
    type: PURCHASE_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getPurchases(api, id, callback) {
  return async (dispatch, getState) => {
    dispatch(requestPurchasePost());
    const url = generateUrl("getPurchases");
    try {
      const { data } = await api.setMethod("GET").setParams({ id }).query(url);
      data.forEach((item) => {
        item.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl);
      });

      dispatch(receivePurchasePost(data));
      callback && callback(data);
    } catch (e) {
      dispatch(errorPurchasePost("Error: something went wrong"));
    }
  };
}
