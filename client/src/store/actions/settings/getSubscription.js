import { generateUrl } from "../../../helpers/functions";

export const GET_SUBSCRIPTION_REQUEST = "GET_SUBSCRIPTION_REQUEST";
export const GET_SUBSCRIPTION_SUCCESS = "GET_SUBSCRIPTION_SUCCESS";
export const GET_SUBSCRIPTION_FAILURE = "GET_SUBSCRIPTION_FAILURE";

function requestGetSubscription() {
  return {
    type: GET_SUBSCRIPTION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetSubscription(data) {
  return {
    type: GET_SUBSCRIPTION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetSubscription(message) {
  return {
    type: GET_SUBSCRIPTION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getSubscription(api) {
  return async (dispatch) => {
    dispatch(requestGetSubscription());

    const url = generateUrl("getSubscription");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetSubscription(data));
    } catch (e) {
      dispatch(errorGetSubscription("Error: something went wrong:", e));
    }
  };
}
