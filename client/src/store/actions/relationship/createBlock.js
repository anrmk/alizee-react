import { generateUrl, isEmptyObject } from "../../../helpers/functions";
import { addUserBlock } from "../user";
import { addPostUserBlock } from "../post";
import { updateCurrentRoom } from "../chat";

export const CREATE_BLOCK_USER_REQUEST = "CREATE_BLOCK_USER_REQUEST";
export const CREATE_BLOCK_USER_SUCCESS = "CREATE_BLOCK_USER_SUCCESS";
export const CREATE_BLOCK_USER_FAILURE = "CREATE_BLOCK_USER_FAILURE";
export const UPDATE_BLOCK_USER_SUCCESS = "UPDATE_BLOCK_USER_SUCCESS";

function requestBlockUser() {
  return {
    type: CREATE_BLOCK_USER_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveBlockUser(data) {
  return {
    type: CREATE_BLOCK_USER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorBlockUser(message) {
  return {
    type: CREATE_BLOCK_USER_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function receiveUpdateBlockUser() {
  return {
    type: UPDATE_BLOCK_USER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

export function createBlock(api, userName, type) {
  return async (dispatch, getState) => {
    dispatch(requestBlockUser());

    const url = generateUrl("createBlock");
    try {
      await api
        .setData({
          userName,
          type: Number(type) || 0,
        })
        .query(url);

      if (!isEmptyObject(getState().user.data)) {
        dispatch(addUserBlock());
        dispatch(receiveUpdateBlockUser());
      }
      if (!isEmptyObject(getState().chat.current)) {
        const current = getState().chat.current;
        
        current.isBlocked = true;

        dispatch(updateCurrentRoom(current));
        dispatch(receiveUpdateBlockUser());
      }
      if (getState().users.data.length) {
        const list = [...getState().users.data];
        const index = list.findIndex((item) => item.userName === userName);

        if (index !== -1) {
          list[index]["isBlocked"] = true;
        }

        dispatch(receiveBlockUser(list));
      }
      if (getState().followingPosts.data.length) {
        dispatch(addPostUserBlock(userName));
        dispatch(receiveUpdateBlockUser());
      }
    } catch {
      dispatch(errorBlockUser("Error: something went wrong"));
    }
  };
}
