import { generateUrl } from "../../../helpers/functions";

export const DELETE_BLACK_LIST_REQUEST = "DELETE_BLACK_LIST_REQUEST";
export const DELETE_BLACK_LIST_SUCCESS = "DELETE_BLACK_LIST_SUCCESS";
export const DELETE_BLACK_LIST_FAILURE = "DELETE_BLACK_LIST_FAILURE";

function requestDeleteBlackList() {
  return {
    type: DELETE_BLACK_LIST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteBlackList(data) {
  return {
    type: DELETE_BLACK_LIST_SUCCESS,
    payload: {
      isFetching: false,
      blackList: data,
      errorMessage: "",
    },
  };
}

function errorDeleteBlackList(message) {
  return {
    type: DELETE_BLACK_LIST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteBlackList(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteBlackList());

    const url = generateUrl("deleteBlackList");

    try {
      await api.setMethod("DELETE").setParams({ userName }).query(url);

      const blackList = getState().settings.blackList;
      const updatedBlackList = blackList.filter((item) => item.userName !== userName);

      dispatch(receiveDeleteBlackList(updatedBlackList));
    } catch (e) {
      dispatch(errorDeleteBlackList("Error: something went wrong:", e));
    }
  };
}
