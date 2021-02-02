import { generateUrl } from "../../../helpers/functions";

export const CREATE_BLACK_LIST_REQUEST = "CREATE_BLACK_LIST_REQUEST";
export const CREATE_BLACK_LIST_SUCCESS = "CREATE_BLACK_LIST_SUCCESS";
export const CREATE_BLACK_LIST_FAILURE = "CREATE_BLACK_LIST_FAILURE";

function requestCreateBlackList() {
  return {
    type: CREATE_BLACK_LIST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateBlackList(data) {
  return {
    type: CREATE_BLACK_LIST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      blackList: data,
    },
  };
}

function errorCreateBlackList(message) {
  return {
    type: CREATE_BLACK_LIST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createBlackList(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestCreateBlackList());

    const url = generateUrl("createBlackList");
    try {
      await api.setParams({ userName: userName }).query(url);

      const blackList = getState().settings.blackList;
      const updatedBlackList = [...blackList, userName];

      dispatch(receiveCreateBlackList(updatedBlackList));
    } catch {
      return dispatch(errorCreateBlackList("When black list was creating then something went wrong"));
    }
  };
}
