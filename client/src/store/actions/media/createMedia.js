import { generateUrl } from '../../../helpers/functions';

export const CREATE_MEDIA_REQUEST = 'CREATE_MEDIA_REQUEST';
export const CREATE_MEDIA_SUCCESS = 'CREATE_MEDIA_SUCCESS';
export const CREATE_MEDIA_FAILURE = 'CREATE_MEDIA_FAILURE';

function requestCreateMedia() {
  return {
    type: CREATE_MEDIA_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveCreateMedia(media) {
  return {
    type: CREATE_MEDIA_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      data: media
    }
  }
}

function errorCreateMedia(message) {
  return {
    type: CREATE_MEDIA_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function createMedia(api, media) {
  return async dispatch => {
    dispatch(requestCreateMedia());

    const url = generateUrl('createMedia');
    try {
      const formData = new FormData();
      media.forEach(file => {
        formData.append(file.name, file);
      });

      const { data } = await api
        .setData(formData)
        .query(url);

      dispatch(receiveCreateMedia(data));
    } catch (e) {
      dispatch(errorCreateMedia("Error: something went wrong"));
    }
  }
}
