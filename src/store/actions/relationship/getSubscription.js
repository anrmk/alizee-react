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
      data,
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

export function getSubscription(api, userName) {
  return async (dispatch, getState) => {
    const user = getState().user.data;
    dispatch(requestGetSubscription());
    const url = generateUrl("getSubscription");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({ userName })
        .query(url);

      dispatch(
        receiveGetSubscription({
          ...user,
          ...data,
        })
      );
    } catch (e) {
      dispatch(errorGetSubscription("Error: something went wrong:", e));
    }
  };
}
