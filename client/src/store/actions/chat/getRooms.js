import { createSelector } from "reselect";

import { generateUrl, generateFileUrl } from "../../../helpers/functions";

export const GET_ROOMS_REQUEST = "GET_ROOMS_REQUEST";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";

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

export function getRooms(api) {
  return async (dispatch) => {
    dispatch(requestGetRooms());

    const url = generateUrl("getRooms");
    try {
      const { data } = await api.setMethod("GET").query(url);
      data.forEach(item => {
        item.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl)
      });

      dispatch(receiveGetRooms(data));
    } catch {
      return dispatch(errorGetRooms("Error: GetRooms"));
    }
  };
}

// SELECTOR FILTER
const querySelector = (state) => state.chat.query;
const dataSelector = (state) => state.chat.data;

export const getFilteredRooms = createSelector(
  [querySelector, dataSelector],
  (query, data) => {
    const res = data
      .filter((item) => item?.name.toLowerCase().includes(query))
      .sort((a, b) => b.newMessagesCount - a.newMessagesCount);
    return res;
  }
);

export function filter(query) {
  return async (dispatch) => {
    dispatch(filterRooms(query));
  };
}

export function addNewMessageCount(roomId, count) {
  return dispatch => dispatch({
    type: ADD_NEW_MESSAGE,
    payload: {
      roomId,
      newMessagesCount: count
    },
  });
}
