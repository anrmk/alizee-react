import { generateUrl, getOffset } from "../../helpers/functions";

export const GET_CHANGE_LOG_REQUEST = "GET_CHANGE_LOG_REQUEST";
export const GET_CHANGE_LOG_SUCCESS = "GET_CHANGE_LOG_SUCCESS";
export const GET_CHANGE_LOG_FAILURE = "GET_CHANGE_LOG_FAILURE";
export const RESET_LOG_SUCCESS = "RESET_LOG_SUCCESS";

export function requestChangeLog() {
  return {
    type: GET_CHANGE_LOG_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveChangeLog(data) {
  return {
    type: GET_CHANGE_LOG_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || [],
    },
  };
}

export function errorChangeLog(message) {
  return async (dispatch) =>
    dispatch({
      type: GET_CHANGE_LOG_FAILURE,
      payload: {
        isFetching: false,
        errorMessage: message,
      },
    });
}

export function resetLogs() {
  return {
    type: RESET_LOG_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: [],
    },
  };
}

export function getChangeLog(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestChangeLog());

    try {
      const url = generateUrl("getChangeLog");
      const currentOffset = getState().changeLog.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: 0,
          length: opts.length
        })
        .query(url);

      dispatch(
        receiveChangeLog([...getState().changeLog.data, ...data.data], data.recordsTotal, currentOffset, !!data.data.length)
      );
    } catch (e) {
      dispatch(errorChangeLog("Error: something went wrong:", e));
    }
  };
}
