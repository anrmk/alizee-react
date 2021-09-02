import { generateUrl } from "../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const UPDATE_ACTIVITY_STATUS_REQUEST = "UPDATE_ACTIVITY_STATUS_REQUEST";
export const UPDATE_ACTIVITY_STATUS_SUCCESS = "UPDATE_ACTIVITY_STATUS_SUCCESS";
export const UPDATE_ACTIVITY_STATUS_FAILURE = "UPDATE_ACTIVITY_STATUS_FAILURE";

function requestUpdateActivityStatus() {
  return {
    type: UPDATE_ACTIVITY_STATUS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdateActivityStatus(data) {
  return {
    type: UPDATE_ACTIVITY_STATUS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdateActivityStatus(message) {
  return {
    type: UPDATE_ACTIVITY_STATUS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updateActivityStatus(api, status) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateActivityStatus());

    const url = generateUrl("updateActivityStatus");
    try {
      await api
        .setParams({
          showStatus: status,
        })
        .query(url);

      const updatedSettings = {
        ...getState().settings.data,
        showActivity: status,
      };

      dispatch(receiveUpdateActivityStatus(updatedSettings));
    } catch (e) {
      dispatch(errorUpdateActivityStatus("Error: something went wrong:", e));
    }
  };
}
