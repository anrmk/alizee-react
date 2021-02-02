import { generateUrl } from "../../../helpers/functions";
import { FOLLOW_ACCEPTED } from "../../../constants/follow_types";

export const ACCEPT_FOLLOW_REQUEST = "ACCEPT_FOLLOW_REQUEST";
export const ACCEPT_FOLLOW_SUCCESS = "ACCEPT_FOLLOW_SUCCESS";
export const ACCEPT_FOLLOW_FAILURE = "ACCEPT_FOLLOW_FAILURE";

function requestAcceptFollow() {
  return {
    type: ACCEPT_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveAcceptFollow(data) {
  return {
    type: ACCEPT_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorAcceptFollow(message) {
  return {
    type: ACCEPT_FOLLOW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function acceptFollow(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestAcceptFollow());

    const url = generateUrl("acceptFollow");
    try {
      await api.setParams({ userName: userName }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index]["status"] = FOLLOW_ACCEPTED;
      }

      dispatch(receiveAcceptFollow(list));
    } catch {
      return dispatch(errorAcceptFollow("When follow was creating then something went wrong"));
    }
  };
}
