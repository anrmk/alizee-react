import { MEDIA_COVER } from "../../../constants/media_types";
import { generateUrl } from "../../../helpers/functions";
import { createMedia } from "../media";

export const UPDATE_COVER_REQUEST = "UPDATE_COVER_REQUEST";
export const UPDATE_COVER_SUCCESS = "UPDATE_COVER_SUCCESS";
export const UPDATE_COVER_FAILURE = "UPDATE_COVER_FAILURE";

export const UPDATE_LOCAL_COVER_SUCCESS = "UPDATE_LOCAL_COVER_SUCCESS";
export const UPDATE_LOCAL_COVER_FAILURE = "UPDATE_LOCAL_COVER_FAILURE";

function requestUpdateCover() {
  return {
    type: UPDATE_COVER_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateCover(user) {
  return {
    type: UPDATE_COVER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: user,
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

function successUpdateLocalCover() {
  return {
    type: UPDATE_LOCAL_COVER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: ""
    }
  }
}

function errorUpdateLocalCover(message) {
  return {
    type: UPDATE_LOCAL_COVER_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function updateCover(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateCover());

    const url = generateUrl("updateCover");
    try {
      if (opts.file?.size) {
        await dispatch(createMedia(api, [opts.file], MEDIA_COVER));

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

      await api.setMethod("PUT").setParams({ mediaId: opts?.mediaId }).query(url);

      dispatch(receiveUpdateCover());
      dispatch(updateLocalCover(opts.url));
    } catch {
      dispatch(errorUpdateCover("Error: something went wrong"));
    }
  };
}

export function updateLocalCover(url) {
  return (dispatch, getState) => {
    try {
      const oldUserInfo = getState().signIn?.userInfo;
      oldUserInfo.coverUrl = url;

      dispatch(successUpdateLocalCover(oldUserInfo));
    } catch {
      dispatch(errorUpdateLocalCover("Error: Couldn't update user data."));
    }
  }
}
