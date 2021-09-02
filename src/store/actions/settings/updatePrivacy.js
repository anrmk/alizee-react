import { generateUrl } from "../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const UPDATE_PRIVACY_REQUEST = "UPDATE_PRIVACY_REQUEST";
export const UPDATE_PRIVACY_SUCCESS = "UPDATE_PRIVACY_SUCCESS";
export const UPDATE_PRIVACY_FAILURE = "UPDATE_PRIVACY_FAILURE";

function requestUpdatePrivacy() {
  return {
    type: UPDATE_PRIVACY_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdatePrivacy(data) {
  return {
    type: UPDATE_PRIVACY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdatePrivacy(message) {
  return {
    type: UPDATE_PRIVACY_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updatePrivacy(api, opts) {
  return async (dispatch) => {
    dispatch(requestUpdatePrivacy());

    const url = generateUrl("updatePrivacy");
    try {
      await api
        .setData({
          accountPrivate: opts.accountPrivate,
          showActivity: opts.showActivity,
          offensiveCommentsHidden: opts.offensiveCommentsHidden,
        })
        .query(url);

      dispatch(receiveUpdatePrivacy(opts));
    } catch (e) {
      dispatch(errorUpdatePrivacy("Error: something went wrong:", e));
    }
  };
}
