import { generateUrl } from "../../../helpers/functions";

export const CREATE_CHAT_MEDIA_REQUEST = "CREATE_CHAT_MEDIA_REQUEST";
export const CREATE_CHAT_MEDIA_SUCCESS = "CREATE_CHAT_MEDIA_SUCCESS";
export const CREATE_CHAT_MEDIA_FAILURE = "CREATE_CHAT_MEDIA_FAILURE";

function requestCreateChatMedia() {
  return {
    type: CREATE_CHAT_MEDIA_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateChatMedia(media) {
  return {
    type: CREATE_CHAT_MEDIA_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: media,
    },
  };
}

function errorCreateChatMedia(message) {
  return {
    type: CREATE_CHAT_MEDIA_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createChatMedia(api, media, mediaType) {
  return async (dispatch) => {
    dispatch(requestCreateChatMedia());

    const url = generateUrl("createChatMedia");
    try {
      const formData = new FormData();
      media.forEach((file) => {
        formData.append("files", file);
      });

      const { data } = await api.setParams({ mediaType }).setData(formData).query(url);

      dispatch(receiveCreateChatMedia(data));
    } catch (e) {
      dispatch(errorCreateChatMedia("Error: something went wrong"));
    }
  };
}
