import { generateUrl } from "../../../helpers/functions";

export const USER_BLOCK_REQUEST = "USER_BLOCK_REQUEST";
export const USER_BLOCK_SUCCESS = "USER_BLOCK_SUCCESS";
export const USER_BLOCK_FAILURE = "USER_BLOCK_FAILURE";

function requestrequestBlock() {
  return {
    type: USER_BLOCK_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiverequestBlock(data) {
  return {
    type: USER_BLOCK_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data
    },
  };
}

function errorrequestBlock(message) {
  return {
    type: USER_BLOCK_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function blockUser(api, userName, followName) {
  return async (dispatch, getState) => {
    dispatch(requestrequestBlock());

    const url = generateUrl("blockUser");
    try {
      await api.setParams({ id: userName }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index]["isBlocked"] = true;
      } 

      dispatch(receiverequestBlock(list));
    } catch {
      return dispatch(errorrequestBlock("When follow was creating then something went wrong"));
    }
  };
}

