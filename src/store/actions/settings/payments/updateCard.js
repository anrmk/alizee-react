import { generateUrl } from "../../../../helpers/functions";

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

export function updateCard(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateCard());
    const { cards = [], wallet = {} } = getState().settings.data;

    const url = generateUrl("updateCard");
    try {
      await api.setMethod("POST").setParams({ id }).query(url);

      const updatedCards = cards.map((card) =>
        card.id === id ? { ...card, is: !card.is } : { ...card, is: false }
      );
      dispatch(receiveUpdateCard({ wallet, cards: updatedCards }));
      return true;
    } catch (e) {
      dispatch(errorUpdateCard("Error: something went wrong:", e));
      return false;
    }
  };
}
