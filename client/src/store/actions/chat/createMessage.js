import { generateUrl } from "../../../helpers/functions";

export const CREATE_MESSAGE_REQUEST = "CREATE_MESSAGE_REQUEST";
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS";
export const CREATE_MESSAGE_FAILURE = "CREATE_MESSAGE_FAILURE";
export const CREATE_MESSAGE = "CREATE_MESSAGE";

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
      status: 200
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

export function addMessage(message) {
  return dispatch => {
    dispatch(receiveCreateMessage());
    dispatch({
      type: CREATE_MESSAGE,
      payload: {
        data: message
      }
    });
  }
}

export function createMessage(api, id, message) {
  return async (dispatch) => {
    dispatch(requestCreateMessage());

    const url = generateUrl("createMessage");
    try {
      //const { status, data } = await api.setData({roomId: id, message}).query(url);
      await api.setData({roomId: id, message}).query(url);

    } catch (e) {
      return dispatch(errorCreateMessage(e));
    }
  };
}
