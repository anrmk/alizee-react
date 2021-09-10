import { ROOMS_LENGTH, ROOMS_OFFSET } from "../../../constants/chat";
import { generateUrl } from "../../../helpers/functions";

export const GET_ROOMS_REQUEST = "GET_ROOMS_REQUEST";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";
export const FILTER_ROOMS = "FILTER_ROOMS";

function requestGetRooms() {
  return {
    type: GET_ROOMS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetRooms(rooms, query, length, start) {
  return {
    type: GET_ROOMS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: start + ROOMS_OFFSET,
      query,
      hasMore: length === ROOMS_LENGTH,
      data: rooms || [],
    },
  };
}

function errorGetRooms(message) {
  return {
    type: GET_ROOMS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      offset: 0,
      errorMessage: message,
    },
  };
}

export function getRooms(api, query) {
  return async (dispatch, getState) => {
    dispatch(requestGetRooms());

    const url = generateUrl("getRooms");
    const isMore = query === getState().chat.query;
    let currentOffset = getState().chat.offset;
    let currentQuery;

    if (!isMore && query) {
      currentOffset = 0;
      currentQuery = query;
    } else if (isMore) {
      currentQuery = getState().chat.query;
    } else {
      currentOffset = 0;
    }

    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: ROOMS_LENGTH,
          search: currentQuery,
        })
        .query(url);

      const newData = isMore ? [...getState().chat.data, ...data] : data;

      dispatch(
        receiveGetRooms(newData, currentQuery, data.length, currentOffset)
      );
    } catch {
      dispatch(errorGetRooms("Error: GetRooms"));
    }
  };
}

export function removeRoom(roomId) {
  return (dispatch, getState) => {
    const oldRooms = getState().chat.data;
    const updatedRooms = oldRooms.filter((room) => room.id !== roomId);

    dispatch(receiveGetRooms(updatedRooms));
  };
}
