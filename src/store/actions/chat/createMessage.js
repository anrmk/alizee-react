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
      errorMessage: "",
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
      current: room,
      data: rooms,
    },
  };
}

export function addMessage(api, data) {
  return async (dispatch, getState) => {
    try {
      const current = { ...getState().chat.current };
      const rooms = [...getState().chat.data];
      let updatedRooms = [];
      const index = rooms.findIndex((item) => item.id === data.roomId);

      if (index !== -1) {
        const hasStateMessage =
          current.messages &&
          current.messages.some((item) => item.id === data.id);
        if (hasStateMessage) {
          return;
        }

        rooms[index].lastMessageText = data.text;

        rooms[index].unreadMessageCount =
          current && current.id === data.roomId
            ? 0
            : rooms[index].unreadMessageCount + 1;

        if (current && current.id === data.roomId) {
          current.messages = [...current.messages, data];
        }

        updatedRooms = [
          rooms[index],
          ...(rooms.filter((item) => item.id !== data.roomId) || []),
        ];

        dispatch(addMessageSuccess(current, updatedRooms));
      } else {
        const newRoom = {
          ...data,
          lastMessageText: data.text,
          unreadMessageCount: 1,
          id: data.roomId,
        };

        updatedRooms = [
          newRoom,
          ...(rooms.filter((item) => item.id !== data.roomId) || []),
        ];

        dispatch(addMessageSuccess(current, updatedRooms));
      }
    } catch (error) {
      dispatch(errorCreateMessage(error));
    }
  };
}

export function createMessage(api, opts) {
  return async (dispatch) => {
    dispatch(requestCreateMessage());

    const url = generateUrl("createMessage");
    try {
      const { id, text, mediaFiles, userName } = opts;

      const formData = new FormData();
      mediaFiles.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("roomId", id);
      formData.append("userName", userName);
      formData.append("text", text);

      const { data } = await api.setData(formData).query(url);

      if (data) {
        dispatch(addMessage(api, data));
      }
      dispatch(receiveCreateMessage());
    } catch (e) {
      dispatch(errorCreateMessage(e));
    }
  };
}
