import { generateUrl, generateFileUrl, copyFlatObjectWithIgnore } from "../../../helpers/functions";

export const GET_ROOM_REQUEST = "GET_ROOM_REQUEST";
export const GET_ROOM_SUCCESS = "GET_ROOM_SUCCESS";
export const GET_ROOM_FAILURE = "GET_ROOM_FAILURE";

function requestGetRoom() {
  return {
    type: GET_ROOM_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    }
  };
}

function receiveGetRoom(data, currentRoom) {
  return {
    type: GET_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
      currentRoom
    }
  };
}

function errorGetRoom(message) {
  return {
    type: GET_ROOM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  };
}

export function getRoom(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestGetRoom());

    const url = generateUrl("getRoom");
    try {
      const { data } = await api.setMethod("GET").setParams({ userName }).query(url);

      const transformedData = {
        ...copyFlatObjectWithIgnore(data, ["userName"]),
        avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, data.avatarUrl),
        username: data.userName
      };

      const chatState = getState().chat;
      const rooms = [...chatState.data];
      const roomIndex = rooms.findIndex(room => room.id === data.id);

      if(roomIndex !== -1) {
        rooms[roomIndex].unreadMessageCount = 0;
      }

      dispatch(receiveGetRoom(rooms, transformedData));
    } catch (e) {
      return dispatch(errorGetRoom(e));
    }
  };
}
