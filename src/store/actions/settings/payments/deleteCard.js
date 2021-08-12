import { generateUrl } from "../../../../helpers/functions";

export const DELETE_CARD_REQUEST = "DELETE_CARD_REQUEST";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";

function requestDeleteCard() {
  return {
    type: DELETE_CARD_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
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
    },
  };
}

function errorDeleteCard(message) {
  return {
    type: DELETE_CARD_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
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
      return true;
    } catch (e) {
      dispatch(errorDeleteCard("Error: something went wrong:", e));
      return false;
    }
  };
}
