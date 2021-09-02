import { generateUrl } from "../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const UPDATE_SUBSCRIPTION_REQUEST = "UPDATE_SUBSCRIPTION_REQUEST";
export const UPDATE_SUBSCRIPTION_SUCCESS = "UPDATE_SUBSCRIPTION_SUCCESS";
export const UPDATE_SUBSCRIPTION_FAILURE = "UPDATE_SUBSCRIPTION_FAILURE";

function requestUpdateSubscription() {
  return {
    type: UPDATE_SUBSCRIPTION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdateSubscription(data) {
  return {
    type: UPDATE_SUBSCRIPTION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdateSubscription(message) {
  return {
    type: UPDATE_SUBSCRIPTION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updateSubscription(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateSubscription());
    const { bundles, campaigns } = getState().settings.data;
    const url = generateUrl("updateSubscription");
    try {
      const { price } = opts;
      await api.setMethod("PUT").setParams({ price }).query(url);

      dispatch(receiveUpdateSubscription({ price, bundles, campaigns }));
    } catch (e) {
      dispatch(errorUpdateSubscription("Error: something went wrong:", e));
    }
  };
}
