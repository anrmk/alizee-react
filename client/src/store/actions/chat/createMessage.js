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

function addMessageSuccess(room, rooms) {
  return {
    type: ADD_MESSAGE_TO_LOCAL,
    payload: {
      currentRoom: room,
      data: rooms
    }
  };
}

export function addMessage(message) {
  return (dispatch, getState) => {
    dispatch(receiveCreateMessage());

    const currentRoom = getState().chat.currentRoom;
    const currentRooms = getState().chat.data;
    
    const roomIndex = currentRooms.findIndex((room) => room.id === currentRoom.id);
    
    const updatedRoom = { ...currentRoom };
    currentRooms[roomIndex].lastMessageText = message.message;
    updatedRoom.messages = [...updatedRoom.messages, message];
    const updatedRooms = [
      currentRooms[roomIndex],
      ...currentRooms.filter(room => room.id !== currentRoom.id) || []
    ];

    dispatch(addMessageSuccess(updatedRoom, updatedRooms));
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
