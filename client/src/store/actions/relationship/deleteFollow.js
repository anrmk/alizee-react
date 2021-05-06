import { generateUrl } from "../../../helpers/functions";
import { removeFollower } from "../user";
import { getDeposit } from "../account";

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
      await api.setMethod("DELETE").setParams({ userName: userName }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index]["isFollow"] = false;
      }

      dispatch(removeFollower());
      dispatch(receiveDeleteFollow(list));
      dispatch(getDeposit(api));
    } catch (e) {
      return dispatch(errorDeleteFollow("When follow was deleting then something went wrong"));
    }
  };
}
