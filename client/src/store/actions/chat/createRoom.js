import { generateUrl, generateFileUrl, copyFlatObjectWithIgnore } from "../../../helpers/functions";

export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_FAILURE = "CREATE_ROOM_FAILURE";

function requestCreateRoom() {
  return {
    type: CREATE_ROOM_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateRoom(data, currentRoom) {
  return {
    type: CREATE_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
      currentRoom
    },
  };
}

function errorCreateRoom(message) {
  return {
    type: CREATE_ROOM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createRoom(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestCreateRoom());

    const url = generateUrl("createRoom");
    try {
      const { data } = await api.setParams({ userName }).query(url);

      const transformedData = {
        ...copyFlatObjectWithIgnore(data, ["userName"]),
        avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, data.avatarUrl),
        userName: data.userName
      };

      const chatState = getState().chat;
      const existedRoom = chatState.data.filter(room => room.id === transformedData.id);
      const rooms = existedRoom.length ?
        [...chatState.data] :
        [...chatState.data, { ...transformedData }];

      dispatch(receiveCreateRoom(rooms, transformedData));
    } catch (e) {
      return dispatch(errorCreateRoom(e));
    }
  };
}
