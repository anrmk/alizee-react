import { generateUrl } from "../../../helpers/functions";

export const CREATE_MESSAGE_REQUEST = "CREATE_MESSAGE_REQUEST";
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS";
export const CREATE_MESSAGE_FAILURE = "CREATE_MESSAGE_FAILURE";
export const ADD_MESSAGE_TO_LOCAL = "ADD_MESSAGE_TO_LOCAL";

function requestCreateMessage() {
  return {
    type: CREATE_MESSAGE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateMessage() {
  return {
    type: CREATE_MESSAGE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: ""
    },
  };
}

function errorCreateMessage(message) {
  return {
    type: CREATE_MESSAGE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function addMessageSuccess(room) {
  return {
    type: ADD_MESSAGE_TO_LOCAL,
    payload: {
      currentRoom: room
    }
  };
}

export function addMessage(message) {
  return (dispatch, getState) => {
    dispatch(receiveCreateMessage());

    const currentRoom = getState().chat.currentRoom;
    const updatedRoom = {
      ...currentRoom,
      messages: [...currentRoom.messages, message]
    }

    dispatch(addMessageSuccess(updatedRoom));
  }
}

export function createMessage(api, id, message) {
  return async (dispatch) => {
    dispatch(requestCreateMessage());

    const url = generateUrl("createMessage");
    try {
      await api
        .setData({ 
          roomId: id, 
          message
        })
        .query(url);
    } catch (e) {
      return dispatch(errorCreateMessage(e));
    }
  };
}
