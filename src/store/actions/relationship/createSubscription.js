import { generateUrl } from "../../../helpers/functions";
import { addFollower } from "../user";
import { getBalance } from "../account";
// import {
//   FOLLOW_ACCEPTED,
//   FOLLOW_PENDING,
//   FOLLOW_NONE,
// } from "../../../constants/follow_types";

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

      const updatedData = toggleFollowStatus(getState().users.data, opts);
      dispatch(
        addFollower(opts.isPrivate, opts.subscriptionPrice || opts.price)
      );
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

export function toggleFollowStatus(
  data,
  { userName, isPrivate, subscriptionPrice, isFollow }
) {
  if (!data || !data.length) return [];

  const list = [...data];
  const index = list.findIndex((item) => item.userName === userName);

  if (index !== -1) {
    isFollow ? (list[index].isFollow = false) : (list[index].isFollow = true);

    // TODO: logic for btn if using in followings, favorites...
    // if (
    //   list[index].followStatus === FOLLOW_ACCEPTED ||
    //   list[index].followStatus === FOLLOW_PENDING
    // ) {
    //   list[index].followStatus === FOLLOW_NONE;
    // } else {
    //   isPrivate || subscriptionPrice
    //     ? (list[index].followStatus = FOLLOW_PENDING)
    //     : (list[index].followStatus = FOLLOW_ACCEPTED);
    // }
  }

  return list;
}
