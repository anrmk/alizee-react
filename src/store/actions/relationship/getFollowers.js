import { generateUrl } from "../../../helpers/functions";

export const GET_FOLLOWERS_REQUEST = "GET_FOLLOWERS_REQUEST";
export const GET_FOLLOWERS_SUCCESS = "GET_FOLLOWERS_SUCCESS";
export const GET_FOLLOWERS_FAILURE = "GET_FOLLOWERS_FAILURE";

function requestGetFollowers() {
  return {
    type: GET_FOLLOWERS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFollowers(data) {
  return {
    type: GET_FOLLOWERS_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

function errorGetFollowers(message) {
  return {
    type: GET_FOLLOWERS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getFollowers(api, userName, status) {
  return async (dispatch) => {
    dispatch(requestGetFollowers());

    const url = generateUrl("getFollowers");
    try {
      const { data } = await api
        .setParams({ userName, status })
        .setMethod("GET")
        .query(url);

      dispatch(receiveGetFollowers(data));
    } catch {
      dispatch(errorGetFollowers("Error: GetFollowers"));
    }
  };
}
