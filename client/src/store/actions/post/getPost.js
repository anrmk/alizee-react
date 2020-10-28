import { generateUrl, generateFileUrl } from '../../../helpers/functions';

export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';

function requestGetPost() {
  return {
    type: GET_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveGetPost(post) {
  return {
    type: GET_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      currentPost: post
    }
  }
}

function errorGetPost(message) {
  return {
    type: GET_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function fetchPost(api, id) {
  return async dispatch => {
    dispatch(requestGetPost());

    const url = generateUrl('getPost');
    try {
      const { data } = await api
        .setMethod('GET')
        .setParams({ id })
        .query(url);

      // Extend relative path to absolute (to remote server)
      const avatarUrl = data.user.avatarUrl;
      data.user = { 
        ...data.user, 
        avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, avatarUrl)
      };
      data.media.forEach(item => {
        item.url = generateFileUrl(process.env.REACT_APP_DOMAIN, item.url);
        item.thumbnailUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, item.thumbnailUrl);
      });

      dispatch(receiveGetPost(data));
    } catch {
      dispatch(errorGetPost("Error: something went wrong"));
    }
  }
}
