import { generateUrl } from "../../../helpers/functions";

export const UPDATE_ACTIVITY_STATUS_REQUEST = "UPDATE_ACTIVITY_STATUS_REQUEST";
export const UPDATE_ACTIVITY_STATUS_SUCCESS = "UPDATE_ACTIVITY_STATUS_SUCCESS";
export const UPDATE_ACTIVITY_STATUS_FAILURE = "UPDATE_ACTIVITY_STATUS_FAILURE";

function requestUpdateActivityStatus() {
  return {
    type: UPDATE_ACTIVITY_STATUS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
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
    },
  };
}

function errorUpdateActivityStatus(message) {
  return {
    type: UPDATE_ACTIVITY_STATUS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
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

      return true;
    } catch (e) {
      dispatch(errorUpdateActivityStatus("Error: something went wrong:", e));
      return false;
    }
  };
}
