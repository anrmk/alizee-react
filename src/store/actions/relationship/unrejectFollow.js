import { generateUrl } from "../../../helpers/functions";
import { FOLLOW_PENDING } from "../../../constants/follow_types";

export const UNREJECT_FOLLOW_REQUEST = "UNREJECT_FOLLOW_REQUEST";
export const UNREJECT_FOLLOW_SUCCESS = "UNREJECT_FOLLOW_SUCCESS";
export const UNREJECT_FOLLOW_FAILURE = "UNREJECT_FOLLOW_FAILURE";

function requestRejectFollow() {
  return {
    type: UNREJECT_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveRejectFollow(data) {
  return {
    type: UNREJECT_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorRejectFollow(message) {
  return {
    type: UNREJECT_FOLLOW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function unrejectFollow(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestRejectFollow());

    const url = generateUrl("rejectFollow");
    try {
      await api.setMethod("DELETE").setParams({ userName }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index].status = FOLLOW_PENDING;
      }

      dispatch(receiveRejectFollow(list));
    } catch {
      dispatch(
        errorRejectFollow("When follow was creating then something went wrong")
      );
    }
  };
}
