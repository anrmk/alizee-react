import { generateUrl } from "../../../helpers/functions";
import { getPost } from "../post/getPost";
import { getDeposit } from "../account";

export const BUY_POST_REQUEST = "BUY_POST_REQUEST";
export const BUY_POST_SUCCESS = "BUY_POST_SUCCESS";
export const BUY_CURRENT_POST_SUCCESS = "BUY_CURRENT_POST_SUCCESS";
export const BUY_POST_FAILURE = "BUY_POST_FAILURE";

function requestBuyPost() {
  return {
    type: BUY_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveBuyPost() {
  return {
    type: BUY_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorBuyPost(message) {
  return {
    type: BUY_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function buyPost(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestBuyPost());

    const url = generateUrl("buyPost");
    try {
      await api.setParams({ id }).query(url);
      dispatch(receiveBuyPost());

      await dispatch(getPost(api, id));
      await dispatch(getDeposit(api));
    } catch (e) {
      dispatch(errorBuyPost("Error: something went wrong"));
    }
  };
}
