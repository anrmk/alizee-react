import { generateUrl } from "../../../helpers/functions";
import { removeFollower } from "../user";
import { getDeposit } from "../account";
import { toggleFollowStatus } from "./createFollow";

export const DELETE_FOLLOW_REQUEST = "DELETE_FOLLOW_REQUEST";
export const DELETE_FOLLOW_SUCCESS = "DELETE_FOLLOW_SUCCESS";
export const DELETE_FOLLOW_FAILURE = "DELETE_FOLLOW_FAILURE";

function requestDeleteFollow() {
  return {
    type: DELETE_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteFollow(data) {
  return {
    type: DELETE_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorDeleteFollow(message) {
  return {
    type: DELETE_FOLLOW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteFollow(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteFollow());
    try {
      const url = generateUrl("deleteFollow");
      await api.setMethod("DELETE").setParams({ userName }).query(url);

      const updatedData = toggleFollowStatus(
        getState().users.data,
        userName,
        false
      );

      dispatch(removeFollower());
      dispatch(receiveDeleteFollow(updatedData));
      dispatch(getDeposit(api));
    } catch (e) {
      dispatch(
        errorDeleteFollow("When follow was deleting then something went wrong")
      );
    }
  };
}
