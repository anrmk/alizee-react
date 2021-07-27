import { generateUrl } from "../../../helpers/functions";

export const GET_USER_STATISTICS_REQUEST = "GET_USER_STATISTICS_REQUEST";
export const GET_USER_STATISTICS_SUCCESS = "GET_USER_STATISTICS_SUCCESS";
export const GET_USER_STATISTICS_FAILURE = "GET_USER_STATISTICS_FAILURE";

function requestGetUserStatistics() {
  return {
    type: GET_USER_STATISTICS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    }
  }
}

function receiveGetUserStatistics(data) {
  return {
    type: GET_USER_STATISTICS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      statistics: data
    }
  }
}

function errorGetUserStatistics(message) {
  return {
    type: GET_USER_STATISTICS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function getUserStatistics(api, userId) {
  return async dispatch => {
    dispatch(requestGetUserStatistics());

    const url = generateUrl("getUserStatistics");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({ id: userId })
        .query(url);

      dispatch(receiveGetUserStatistics(data));
    } catch {
      dispatch(errorGetUserStatistics("Error: something went wrong"));
    }
  }
}