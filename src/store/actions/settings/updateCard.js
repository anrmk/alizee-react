import { generateUrl } from "../../../helpers/functions";

export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

function requestUpdateCard() {
  return {
    type: UPDATE_CARD_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateCard(data) {
  return {
    type: UPDATE_CARD_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorUpdateCard(message) {
  return {
    type: UPDATE_CARD_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateCard(api, data) {
  return async (dispatch) => {
    dispatch(requestUpdateCard());

    const url = generateUrl("updateCard");
    try {
      await api.setMethod("PUT").setData(data).query(url);

      dispatch(receiveUpdateCard(data));
      return true;
    } catch (e) {
      dispatch(errorUpdateCard("Error: something went wrong:", e));
      return false;
    }
  };
}
