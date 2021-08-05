// import { generateUrl } from "../../../../helpers/functions";

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
    },
  };
}

function errorDeleteSubscriptionBundle(message) {
  return {
    type: DELETE_SUBSCRIPTION_BUNDLE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteSubscriptionBundle(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteSubscriptionBundleRequest());
    //   TODO: connect api

    // const url = generateUrl("deleteSubscriptionBundle");
    try {
      const { bundles, price, campaigns } = getState().settings.data;

      //   await api
      //     .setMethod("DELETE")
      //     .setParams(opts)
      //     .query(url);
      const removedBundleArray = bundles.filter((item) => item.id !== opts);

      dispatch(
        receiveDeleteSubscriptionBundleReceive({
          price,
          campaigns,
          bundles: removedBundleArray,
        })
      );
      return true;
    } catch (e) {
      dispatch(
        errorDeleteSubscriptionBundle("Error: something went wrong:", e)
      );
      return false;
    }
  };
}
