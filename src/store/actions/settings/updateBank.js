import { generateUrl } from "../../../helpers/functions";

export const UPDATE_BANK_REQUEST = "UPDATE_BANK_REQUEST";
export const UPDATE_BANK_SUCCESS = "UPDATE_BANK_SUCCESS";
export const UPDATE_BANK_FAILURE = "UPDATE_BANK_FAILURE";

function requestUpdateBank() {
  return {
    type: UPDATE_BANK_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateBank(data) {
  return {
    type: UPDATE_BANK_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorUpdateBank(message) {
  return {
    type: UPDATE_BANK_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateBank(api, data) {
  return async (dispatch) => {
    dispatch(requestUpdateBank());

    const url = generateUrl("updateBank");
    try {
      await api.setMethod("PUT").setData(data).query(url);

      dispatch(receiveUpdateBank(data));
      return true;
    } catch (e) {
      dispatch(errorUpdateBank("Error: something went wrong:", e));
      return false;
    }
  };
}
