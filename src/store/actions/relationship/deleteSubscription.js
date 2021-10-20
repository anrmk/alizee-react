import { generateUrl } from "../../../helpers/functions";
import { removeFollower } from "../user";
import { getBalance } from "../account";
import { toggleFollowStatus } from "./createSubscription";

export const DELETE_SUBSCRIPTION_REQUEST = "DELETE_SUBSCRIPTION_REQUEST";
export const DELETE_SUBSCRIPTION_SUCCESS = "DELETE_SUBSCRIPTION_SUCCESS";
export const DELETE_SUBSCRIPTION_FAILURE = "DELETE_SUBSCRIPTION_FAILURE";

function requestDeleteSubscription() {
  return {
    type: DELETE_SUBSCRIPTION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteSubscription(data) {
  return {
    type: DELETE_SUBSCRIPTION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorDeleteSubscription(message) {
  return {
    type: DELETE_SUBSCRIPTION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteSubscription(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteSubscription());

    try {
      const url = generateUrl("deleteSubscription");
      await api
        .setMethod("DELETE")
        .setParams({ userName: opts.userName })
        .query(url);

      const updatedData = toggleFollowStatus(getState().users.data, opts);

      dispatch(removeFollower());
      dispatch(receiveDeleteSubscription(updatedData));
      dispatch(getBalance(api));
    } catch (e) {
      dispatch(
        errorDeleteSubscription(
          "When follow was deleting then something went wrong"
        )
      );
    }
  };
}
