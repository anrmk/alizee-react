import { generateUrl } from "../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const UPDATE_PRIVATE_STATUS_REQUEST = "UPDATE_PRIVATE_STATUS_REQUEST";
export const UPDATE_PRIVATE_STATUS_SUCCESS = "UPDATE_PRIVATE_STATUS_SUCCESS";
export const UPDATE_PRIVATE_STATUS_FAILURE = "UPDATE_PRIVATE_STATUS_FAILURE";

function requestUpdatePrivateStatus() {
  return {
    type: UPDATE_PRIVATE_STATUS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdatePrivateStatus(data) {
  return {
    type: UPDATE_PRIVATE_STATUS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdatePrivateStatus(message) {
  return {
    type: UPDATE_PRIVATE_STATUS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updatePrivateStatus(api, status) {
  return async (dispatch, getState) => {
    dispatch(requestUpdatePrivateStatus());

    const url = generateUrl("updatePrivateStatus");
    try {
      await api
        .setParams({
          isPrivate: status,
        })
        .query(url);

      const updatedSettings = {
        ...getState().settings.data,
        accountPrivate: status,
      };

      dispatch(receiveUpdatePrivateStatus(updatedSettings));
    } catch (e) {
      dispatch(errorUpdatePrivateStatus("Error: something went wrong:", e));
    }
  };
}
