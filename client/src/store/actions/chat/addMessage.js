export const ADD_MESSAGE = "ADD_MESSAGE";

function extendMessages(message) {
  return {
    type: ADD_MESSAGE,
    payload: {
      data: message
    }
  }
}

export function addMessage(message) {
  return dispatch => {
    dispatch(extendMessages(message));
  }
}