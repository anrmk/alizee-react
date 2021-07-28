import { generateUrl, isEmptyObject } from "../../../helpers/functions";
import { changeCover } from "../user";

export const UPDATE_COVER_REQUEST = "UPDATE_COVER_REQUEST";
export const UPDATE_COVER_SUCCESS = "UPDATE_COVER_SUCCESS";
export const UPDATE_COVER_FAILURE = "UPDATE_COVER_FAILURE";

function requestUpdateCover() {
  return {
    type: UPDATE_COVER_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateCover(data) {
  return {
    type: UPDATE_COVER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      userInfo: data,
    },
  };
}

function errorUpdateCover(message) {
  return {
    type: UPDATE_COVER_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateCover(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateCover());

    const url = generateUrl("updateCover");
    try {
      const formData = new FormData();
      formData.append("file", opts.file);

      const { data } = await api.setMethod("PUT").setData(formData).query(url);

      const userInfo = getState().signIn?.userInfo;
      userInfo.coverUrl = data.url;
      dispatch(receiveUpdateCover(userInfo));

      const user = getState().user.data;
      if (!isEmptyObject(user) && user?.userName === userInfo.userName) {
        dispatch(changeCover(data.url));
      }
    } catch {
      dispatch(errorUpdateCover("Error: something went wrong"));
    }
  };
}
