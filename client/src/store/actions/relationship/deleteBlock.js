import { generateUrl } from "../../../helpers/functions";
import { removeBlocked } from "../user";

export const UNBLOCK_USER_REQUEST = "UNBLOCK_USER_REQUEST";
export const UNBLOCK_USER_SUCCESS = "UNBLOCK_USER_SUCCESS";
export const UNBLOCK_USER_FAILURE = "UNBLOCK_USER_FAILURE";

function requestUnblockUser() {
  return {
    type: UNBLOCK_USER_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUnblockUser(data) {
  return {
    type: UNBLOCK_USER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorUnblockUser(message) {
  return {
    type: UNBLOCK_USER_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteBlock(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestUnblockUser());

    const url = generateUrl("deleteBlock");
    try {
      await api.setMethod("DELETE").setParams({ userName }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index]["isBlocked"] = false;
      }

      dispatch(removeBlocked());
      dispatch(receiveUnblockUser(list));
    } catch {
      dispatch(errorUnblockUser("Error: something went wrong"));
    }
  };
}
