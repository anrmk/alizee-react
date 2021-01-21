import { createSelector } from "reselect";

import { generateUrl, generateFileUrl, copyFlatObjectWithIgnore } from "../../../helpers/functions";

export const GET_ROOMS_REQUEST = "GET_ROOMS_REQUEST";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const INCREMENT_NEW_MESSAGE_COUNT = "INCREMENT_NEW_MESSAGE_COUNT";

function requestGetRooms() {
  return {
    type: GET_ROOMS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetRooms(rooms) {
  return {
    type: GET_ROOMS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: rooms || [],
    },
  };
}

function errorGetRooms(message) {
  return {
    type: GET_ROOMS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function filterRooms(query) {
  return {
    type: FILTER_ROOMS,
    payload: {
      isFetching: false,
      errorMessage: "",
      query,
    },
  };
}

function successIncrementNewMessageCount(rooms) {
  return {
    type: INCREMENT_NEW_MESSAGE_COUNT,
    payload: {
      data: rooms,
    },
  };
}

export function getRooms(api) {
  return async (dispatch) => {
    dispatch(requestGetRooms());

    const url = generateUrl("getRooms");
    try {
      const { data } = await api.setMethod("GET").query(url);

      const transformedData = data.map((item) => ({
        ...item,
        avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl),
      }));

      dispatch(receiveGetRooms(transformedData));
    } catch {
      return dispatch(errorGetRooms("Error: GetRooms"));
    }
  };
}

export function filter(query) {
  return async (dispatch) => {
    dispatch(filterRooms(query));
  };
}

export function incrementNewMessageCount(data) {
  return (dispatch, getState) => {
    const oldRooms = getState().chat.data;
    const updatedRooms = [...oldRooms];
    const roomIndex = updatedRooms.findIndex((room) => room.id === data.roomId);
    const currentRoom = updatedRooms[roomIndex];

    if (roomIndex !== -1) {
      currentRoom.unreadMessageCount++;
      currentRoom.lastMessageText = data.message;
    }

    dispatch(successIncrementNewMessageCount([
      currentRoom,
      ...updatedRooms.filter(room => room.id !== currentRoom.id)
    ]));
  };
}

export function removeRoom(roomId) {
  return (dispatch, getState) => {
    const oldRooms = getState().chat.data;
    const updatedRooms = oldRooms.filter((room) => room.id !== roomId);

    dispatch(receiveGetRooms(updatedRooms));
  }
}

// SELECTOR FILTER
const querySelector = (state) => state.chat.query;
const dataSelector = (state) => state.chat.data;

export const getFilteredRooms = createSelector([querySelector, dataSelector], (query, data) => {
  if (!query) return data;

  return data
    .filter((item) => item && item.name.toLowerCase().includes(query))
    .sort((a, b) => b.unreadMessageCount - a.unreadMessageCount);
});
