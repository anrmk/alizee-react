import { generateUrl } from "../../../helpers/functions";
import { addFollower } from "../user";
import { getBalance } from "../account";

export const CREATE_SUBSCRIPTION_REQUEST = "CREATE_SUBSCRIPTION_REQUEST";
export const CREATE_SUBSCRIPTION_SUCCESS = "CREATE_SUBSCRIPTION_SUCCESS";
export const CREATE_SUBSCRIPTION_FAILURE = "CREATE_SUBSCRIPTION_FAILURE";

function requestCreateSubscription() {
  return {
    type: CREATE_SUBSCRIPTION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateSubscription(data) {
  return {
    type: CREATE_SUBSCRIPTION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorCreateSubscription(message) {
  return {
    type: CREATE_SUBSCRIPTION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createSubscription(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCreateSubscription());
    const url = generateUrl("createSubscription");

    const data = { userName: opts.userName };

    if (opts.campaignId) {
      data.campaignId = opts.campaignId;
    }
    if (opts.bundleId) {
      data.bundleId = opts.bundleId;
    }

    try {
      await api.setData(data).query(url);

      const updatedData = toggleFollowStatus(
        getState().users.data,
        opts.userName,
        true
      );
      dispatch(addFollower(opts.isPrivateAccount));
      dispatch(receiveCreateSubscription(updatedData));
      dispatch(getBalance(api));
    } catch {
      dispatch(
        errorCreateSubscription(
          "When follow was creating then something went wrong"
        )
      );
    }
  };
}

export function toggleFollowStatus(data, userName, status) {
  if (!data || !data.length) return [];

  const list = [...data];
  const index = list.findIndex((item) => item.userName === userName);

  if (index !== -1) {
    list[index].isFollow = status;
  }

  return list;
}
