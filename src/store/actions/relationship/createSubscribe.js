import { generateUrl } from "../../../helpers/functions";
import { addFollower } from "../user";
import { getBalance } from "../account";

export const CREATE_SUBSCRIBE_REQUEST = "CREATE_SUBSCRIBE_REQUEST";
export const CREATE_SUBSCRIBE_SUCCESS = "CREATE_SUBSCRIBE_SUCCESS";
export const CREATE_SUBSCRIBE_FAILURE = "CREATE_SUBSCRIBE_FAILURE";

function requestCreateSubscribe() {
  return {
    type: CREATE_SUBSCRIBE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateSubscribe(data) {
  return {
    type: CREATE_SUBSCRIBE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorCreateSubscribe(message) {
  return {
    type: CREATE_SUBSCRIBE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createSubscribe(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCreateSubscribe());
    const url = generateUrl("createSubscribe");

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
      dispatch(receiveCreateSubscribe(updatedData));
      dispatch(getBalance(api));
    } catch {
      dispatch(
        errorCreateSubscribe(
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
