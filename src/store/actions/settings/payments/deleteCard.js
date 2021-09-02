import { generateUrl } from "../../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../../constants/request_status";

export const DELETE_CARD_REQUEST = "DELETE_CARD_REQUEST";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";

function requestDeleteCard() {
  return {
    type: DELETE_CARD_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveDeleteCard(data) {
  return {
    type: DELETE_CARD_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorDeleteCard(message) {
  return {
    type: DELETE_CARD_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function deleteCard(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteCard());
    const { cards = [], wallet = {} } = getState().settings.data;

    const url = generateUrl("deleteCard");
    try {
      await api.setMethod("DELETE").setParams({ id }).query(url);

      const filteredCards = cards.filter((card) => card.id !== id);

      dispatch(receiveDeleteCard({ wallet, cards: filteredCards }));
    } catch (e) {
      dispatch(errorDeleteCard("Error: something went wrong:", e));
    }
  };
}
