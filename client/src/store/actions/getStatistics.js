import { generateUrl } from "../../helpers/functions";

import data from "../../domain/PostStatistics/data";

export const GET_STATISTICS_REQUEST = "GET_STATISTICS_REQUEST";
export const GET_STATISTICS_SUCCESS = "GET_STATISTICS_SUCCESS";
export const GET_STATISTICS_FAILURE = "GET_STATISTICS_FAILURE";
export const RESET_STATISTICS = "RESET_STATISTICS";

function requestGetStatistics() {
  return {
    type: GET_STATISTICS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetStatistics(data) {
  return {
    type: GET_STATISTICS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorGetStatistics(message) {
  return {
    type: GET_STATISTICS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function resetStatistics() {
  return {
    type: RESET_STATISTICS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: [],
    },
  };
}

export function getStatistics(api, id = null) {
  return async (dispatch) => {
    dispatch(requestGetStatistics());

    const url = generateUrl("getStatistics");
//TODO: uncomment when backend will be ready
    try {
      if (id) {
        // const { data } = await api.setMethod("GET").setParams({ id }).query(url);
        dispatch(receiveGetStatistics(data));
      } else {
        const { data } = await api.setMethod("GET").query(url);
        dispatch(receiveGetStatistics(data));
      }
    } catch {
      dispatch(errorGetStatistics("Error: something went wrong"));
    }
  };
}
