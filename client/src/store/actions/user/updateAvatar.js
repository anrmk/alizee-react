import { generateUrl } from '../../../helpers/functions';
import { MEDIA_AVATAR } from "../../../constants/media_types";
import { createMedia } from "../media";

export const UPDATE_AVATAR_URL_REQUEST = "UPDATE_AVATAR_URL_REQUEST";
export const UPDATE_AVATAR_URL_SUCCESS = "UPDATE_AVATAR_URL_SUCCESS";
export const UPDATE_AVATAR_URL_FAILURE = "UPDATE_AVATAR_URL_FAILURE";

export const UPDATE_LOCAL_AVATAR_SUCCESS = "UPDATE_LOCAL_AVATAR_SUCCESS";
export const UPDATE_LOCAL_AVATAR_FAILURE = "UPDATE_LOCAL_AVATAR_FAILURE";

function requestUpdateAvatar() {
  return {
    type: UPDATE_AVATAR_URL_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveUpdateAvatar() {
  return {
    type: UPDATE_AVATAR_URL_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
    }
  }
}

function errorUpdateAvatar(message) {
  return {
    type: UPDATE_AVATAR_URL_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

function successUpdateLocalAvatar(data) {
  return {
    type: UPDATE_LOCAL_AVATAR_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      userInfo: data || {}
    }
  }
}

function errorUpdateLocalAvatar(message) {
  return {
    type: UPDATE_LOCAL_AVATAR_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function updateAvatar(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateAvatar());

    const url = generateUrl("updateAvatar");
    try {
      if (opts.file?.size) {
        await dispatch(createMedia(api, [opts.file], MEDIA_AVATAR));

        const mediaErrorMessage = getState().media.errorMessage;
        if (mediaErrorMessage) {
          throw mediaErrorMessage;
        }

        const media = getState().media.data;
        if (media.length) {
          opts.url = media[0]?.url;
          opts.mediaId = media[0]?.id;
        }
      } else {
        opts.url = null;
      }

      await api.setMethod("PUT").setParams({ url: opts?.url }).query(url);

      dispatch(receiveUpdateAvatar());
      dispatch(updateLocalAvatar(opts.url));
    } catch (e) {
      dispatch(errorUpdateAvatar("Error: something went wrong:", e));
    }
  }
}

export function updateLocalAvatar(url) {
  return (dispatch, getState) => {
    try {
      const oldUserInfo = getState().signIn?.userInfo;
      oldUserInfo.avatarUrl = url;

      dispatch(successUpdateLocalAvatar(oldUserInfo));
    } catch {
      dispatch(errorUpdateLocalAvatar("Error: Couldn't update user data."));
    }
  }
}
