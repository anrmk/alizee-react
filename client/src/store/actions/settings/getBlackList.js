import { generateUrl, generateFileUrl } from "../../../helpers/functions";

export const GET_BLACK_LIST_REQUEST = "GET_BLACK_LIST_REQUEST";
export const GET_BLACK_LIST_SUCCESS = "GET_BLACK_LIST_SUCCESS";
export const GET_BLACK_LIST_FAILURE = "GET_BLACK_LIST_FAILURE";

function requestGetBlackList() {
  return {
    type: GET_BLACK_LIST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    }
  }
}

function receiveGetBlackList(data) {
  return {
    type: GET_BLACK_LIST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      blackList: data || []
    }
  }
}

function errorGetBlackList(message) {
  return {
    type: GET_BLACK_LIST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function getBlackList(api) {
  return async dispatch => {
    dispatch(requestGetBlackList());

    const url = generateUrl("getBlackList");
    try {
      const { data } = await api
        .setMethod("GET")
        .query(url);

      const transformedData = data.map((item) => ({
        username: item.userName,
        avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl),
        createdDate: item.createdDate,
        id: item.userId
      }))

      dispatch(receiveGetBlackList(transformedData));
    } catch (e) {
      dispatch(errorGetBlackList("Error: something went wrong:", e));
    }
  }
}
