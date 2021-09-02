import { generateUrl } from "../../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../../constants/request_status";

export const DELETE_SUBSCRIPTION_BUNDLE_REQUEST =
  "DELETE_SUBSCRIPTION_BUNDLE_REQUEST";
export const DELETE_SUBSCRIPTION_BUNDLE_SUCCESS =
  "DELETE_SUBSCRIPTION_BUNDLE_SUCCESS";
export const DELETE_SUBSCRIPTION_BUNDLE_FAILURE =
  "DELETE_SUBSCRIPTION_BUNDLE_FAILURE";

function requestDeleteSubscriptionBundleRequest() {
  return {
    type: DELETE_SUBSCRIPTION_BUNDLE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveDeleteSubscriptionBundleReceive(data) {
  return {
    type: DELETE_SUBSCRIPTION_BUNDLE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorDeleteSubscriptionBundle(message) {
  return {
    type: DELETE_SUBSCRIPTION_BUNDLE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function deleteSubscriptionBundle(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteSubscriptionBundleRequest());

    const url = generateUrl("deleteSubscriptionBundle");

    const { bundles, price, campaigns } = getState().settings.data;

    try {
      await api.setMethod("DELETE").setParams({ id: opts }).query(url);
      const removedBundleArray = bundles.filter((item) => item.id !== opts);

      dispatch(
        receiveDeleteSubscriptionBundleReceive({
          price,
          campaigns,
          bundles: removedBundleArray,
        })
      );
    } catch (e) {
      dispatch(
        errorDeleteSubscriptionBundle("Error: something went wrong:", e)
      );
    }
  };
}
