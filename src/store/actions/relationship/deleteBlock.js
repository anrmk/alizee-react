import { generateUrl, isEmptyObject } from "../../../helpers/functions";
import { removeUserBlock } from "../user";
import { removePostUserBlock } from "../post";
import { updateCurrentRoom } from "../chat";

export const UNBLOCK_USER_REQUEST = "UNBLOCK_USER_REQUEST";
export const UNBLOCK_USER_SUCCESS = "UNBLOCK_USER_SUCCESS";
export const UNBLOCK_USER_FAILURE = "UNBLOCK_USER_FAILURE";
export const UPDATE_UNBLOCK_USER = "UPDATE_UNBLOCK_USER";

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

function receiveUpdateBlockUser() {
  return {
    type: UPDATE_UNBLOCK_USER,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

export function deleteBlock(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestUnblockUser());

    const url = generateUrl("deleteBlock");
    try {
      await api.setMethod("DELETE").setParams({ userName }).query(url);

      if (!isEmptyObject(getState().user.data)) {
        dispatch(removeUserBlock());
        dispatch(receiveUpdateBlockUser());
      }

      if (!isEmptyObject(getState().chat.current)) {
        const current = getState().chat.current;
        current.isBlocked = false;

        dispatch(updateCurrentRoom(current));
        dispatch(receiveUpdateBlockUser());
      }

      if (getState().users.data) {
        const list = [...getState().users.data];
        const index = list.findIndex((item) => item.userName === userName);

        if (index !== -1) {
          list[index]["isBlocked"] = false;
        }

        dispatch(receiveUnblockUser(list));
      }
      if (getState().followingPosts.data.length) {
        dispatch(removePostUserBlock(userName));
        dispatch(receiveUpdateBlockUser());
      }
    } catch {
      dispatch(errorUnblockUser("Error: something went wrong"));
    }
  };
}
