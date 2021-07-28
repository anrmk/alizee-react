import { generateUrl } from "../../../helpers/functions";

export const NOTIFY_CALL_SUCCESS = "NOTIFY_CALL_SUCCESS";
export const NOTIFY_CALL_FAILURE = "NOTIFY_CALL_FAILURE";

function receiveCallNotify() {
  return {
    type: NOTIFY_CALL_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorCallNotify(message) {
  return {
    type: NOTIFY_CALL_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function notifyCall(api, userName) {
  return async (dispatch) => {
    const url = generateUrl("notifyCall");
    try {
      await api.setParams({ userName }).query(url);
      dispatch(receiveCallNotify());
    } catch (e) {
      dispatch(errorCallNotify("Error: something went wrong"));
    }
  };
}
