import { generateUrl, isEmptyObject } from "../../../helpers/functions";
import { changeAvatar } from "../user";

export const UPDATE_AVATAR_REQUEST = "UPDATE_AVATAR_REQUEST";
export const UPDATE_AVATAR_SUCCESS = "UPDATE_AVATAR_SUCCESS";
export const UPDATE_AVATAR_FAILURE = "UPDATE_AVATAR_FAILURE";

function requestUpdateAvatar() {
  return {
    type: UPDATE_AVATAR_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateAvatar(data) {
  return {
    type: UPDATE_AVATAR_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      userInfo: data || {},
    },
  };
}

function errorUpdateAvatar(message) {
  return {
    type: UPDATE_AVATAR_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateAvatar(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateAvatar());

    const url = generateUrl("updateAvatar");
    try {
      const formData = new FormData();
      formData.append("file", opts.file);

      const { data } = await api.setMethod("PUT").setData(formData).query(url);

      const userInfo = getState().signIn?.userInfo;
      userInfo.avatarUrl = data.url;
      dispatch(receiveUpdateAvatar(userInfo));

      const user = getState().user.data;
      if (!isEmptyObject(user) && user?.userName === userInfo.userName) {
        dispatch(changeAvatar(data.url));
      }
    } catch (e) {
      dispatch(errorUpdateAvatar("Error: something went wrong:", e));
    }
  };
}
