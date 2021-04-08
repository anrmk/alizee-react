import { generateUrl } from "../../../helpers/functions";
import { addBlocked } from "../user";

export const BLOCK_USER_REQUEST = "BLOCK_USER_REQUEST";
export const BLOCK_USER_SUCCESS = "BLOCK_USER_SUCCESS";
export const BLOCK_USER_FAILURE = "BLOCK_USER_FAILURE";

function requestBlockUser() {
  return {
    type: BLOCK_USER_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveBlockUser(data) {
  return {
    type: BLOCK_USER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorBlockUser(message) {
  return {
    type: BLOCK_USER_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createBlock(api, userName, type) {
  return async (dispatch, getState) => {
    dispatch(requestBlockUser());

    const url = generateUrl("createBlock");
    try {
      await api.setData({
        userName, 
        type: Number(type) || 0 
      }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index]["isBlocked"] = true;
      }

      dispatch(addBlocked());
      dispatch(receiveBlockUser(list));
    } catch {
      dispatch(errorBlockUser("Error: something went wrong"));
    }
  };
}
