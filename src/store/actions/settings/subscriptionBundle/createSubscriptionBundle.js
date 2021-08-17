import { generateUrl } from "../../../../helpers/functions";

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

    const { bundles, price, campaigns } = getState().settings.data;
    const url = generateUrl("createSubscriptionBundle");

    try {
      const isBundleCreated = bundles.some(
        (item) => item.duration === opts.duration
      );
      if (isBundleCreated) {
        throw Error(" bundle with same duration  was created");
      }

      const { data } = await api.setMethod("POST").setData(opts).query(url);

      const isCreated = bundles.some((item) => item.id === data.id);
      if (isCreated) {
        throw Error(" bundle with same duration  was created");
      }

      dispatch(
        receiveCreateSubscriptionBundleReceive({
          price,
          campaigns,
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
