import { generateUrl } from "../../../helpers/functions";
import { FOLLOW_REJECTED } from "../../../constants/follow_types";

export const REJECT_FOLLOW_REQUEST = "REJECT_FOLLOW_REQUEST";
export const REJECT_FOLLOW_SUCCESS = "REJECT_FOLLOW_SUCCESS";
export const REJECT_FOLLOW_FAILURE = "REJECT_FOLLOW_FAILURE";

function requestRejectFollow() {
  return {
    type: REJECT_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveRejectFollow(data) {
  return {
    type: REJECT_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorRejectFollow(message) {
  return {
    type: REJECT_FOLLOW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function rejectFollow(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestRejectFollow());

    const url = generateUrl("rejectFollow");
    try {
      await api.setParams({ userName }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index].status = FOLLOW_REJECTED;
      }

      dispatch(receiveRejectFollow(list));
    } catch {
      dispatch(
        errorRejectFollow("When follow was creating then something went wrong")
      );
    }
  };
}
