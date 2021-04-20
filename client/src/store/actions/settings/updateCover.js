import { MEDIA_COVER } from "../../../constants/media_types";
import { generateUrl } from "../../../helpers/functions";
import { createMedia } from "../media";

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

export function updateCover(api, mediaData = []) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateCover());

    const url = generateUrl("updateCover");
    try {
      if (mediaData && mediaData.length === 0) {
        throw "Media data doesn't exist";
      }

      await dispatch(createMedia(api, mediaData, MEDIA_COVER));

      const mediaErrorMessage = getState().media.errorMessage;
      if (mediaErrorMessage) {
        throw "Media data doesn't exist";
      }

      const media = getState().media.data;

      if (media && media.length === 0) {
        throw "Media data doesn't exist or empty";
      }

      const updatedCoverUrl = media[0].url;
      const updatedCoverMediaId = media[0].id;

      await api
        .setMethod("PUT")
        .setParams({
          mediaId: updatedCoverMediaId,
        })
        .query(url);

      const user = getState().user.data;
      user.coverUrl = updatedCoverUrl;

      dispatch(receiveUpdateCover(user));
    } catch {
      dispatch(errorUpdateCover("Error: something went wrong"));
    }
  };
}
