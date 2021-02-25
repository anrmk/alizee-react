import { generateUrl } from "../../../helpers/functions";

export const GET_CARD_REQUEST = "GET_CARD_REQUEST";
export const GET_CARD_SUCCESS = "GET_CARD_SUCCESS";
export const GET_CARD_FAILURE = "GET_CARD_FAILURE";

function requestGetCard() {
  return {
    type: GET_CARD_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetCard(data) {
  return {
    type: GET_CARD_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetCard(message) {
  return {
    type: GET_CARD_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getCard(api) {
  return async (dispatch) => {
    dispatch(requestGetCard());

    const url = generateUrl("getCard");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetCard(data));
    } catch (e) {
      dispatch(errorGetCard("Error: something went wrong:", e));
    }
  };
}
