import { generateUrl } from "../../../helpers/functions";
import { removeFollower } from "../user";
import { getDeposit } from "../account";
import { toggleFollowStatus } from "./createSubscribe";

export const DELETE_SUBSCRIBE_REQUEST = "DELETE_SUBSCRIBE_REQUEST";
export const DELETE_SUBSCRIBE_SUCCESS = "DELETE_SUBSCRIBE_SUCCESS";
export const DELETE_SUBSCRIBE_FAILURE = "DELETE_SUBSCRIBE_FAILURE";

function requestDeleteSubscribe() {
  return {
    type: DELETE_SUBSCRIBE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteSubscribe(data) {
  return {
    type: DELETE_SUBSCRIBE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorDeleteSubscribe(message) {
  return {
    type: DELETE_SUBSCRIBE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteSubscribe(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteSubscribe());

    const data = { userName: opts.userName };

    if (opts.campaignId) {
      data.campaignId = opts.campaignId;
    }
    if (opts.bundleId) {
      data.bundleId = opts.bundleId;
    }

    try {
      const url = generateUrl("unsubscribe");
      await api.setMethod("DELETE").setData(data).query(url);

      const updatedData = toggleFollowStatus(
        getState().users.data,
        opts.userName,
        false
      );

      dispatch(removeFollower());
      dispatch(receiveDeleteSubscribe(updatedData));
      dispatch(getDeposit(api));
    } catch (e) {
      dispatch(
        errorDeleteSubscribe(
          "When follow was deleting then something went wrong"
        )
      );
    }
  };
}
