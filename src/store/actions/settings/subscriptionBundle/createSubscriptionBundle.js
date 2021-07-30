// import { generateUrl } from "../../../../helpers/functions";

export const CREATE_SUBSCRIPTION_BUNDLE_REQUEST =
  "CREATE_SUBSCRIPTION_BUNDLE_REQUEST";
export const CREATE_SUBSCRIPTION_BUNDLE_SUCCESS =
  "CREATE_SUBSCRIPTION_BUNDLE_SUCCESS";
export const CREATE_SUBSCRIPTION_BUNDLE_FAILURE =
  "CREATE_SUBSCRIPTION_BUNDLE_FAILURE";

function requestCreateSubscriptionBundleRequest() {
  return {
    type: CREATE_SUBSCRIPTION_BUNDLE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateSubscriptionBundleReceive(data) {
  return {
    type: CREATE_SUBSCRIPTION_BUNDLE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorCreateSubscriptionBundle(message) {
  return {
    type: CREATE_SUBSCRIPTION_BUNDLE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createSubscriptionBundle(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCreateSubscriptionBundleRequest());

    //   TODO: connect api

    // const url = generateUrl("createSubscriptionBundle");
    try {
      const { bundles, price } = getState().settings.data;
      const isBundleCreated = bundles.some(
        (item) => item.duration === opts.duration
      );
      if (isBundleCreated) {
        throw Error(" bundle with same duration  was created");
      }
      //   await api
      //     .setMethod("POST")
      //     .setParams(opts)
      //     .query(url);

      dispatch(
        receiveCreateSubscriptionBundleReceive({
          price,
          bundles: [...bundles, opts],
        })
      );
      return true;
    } catch (e) {
      dispatch(
        errorCreateSubscriptionBundle("Error: something went wrong:", e)
      );
      return false;
    }
  };
}
