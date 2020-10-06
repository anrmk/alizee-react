import { generateUrl, getOffset } from '../../helpers/functions';
import { POSTS_OFFSET } from '../../constants/feed';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

function requestGetPosts() {
  return {
    type: GET_POSTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveGetPosts(posts, start) {
  return {
    type: GET_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      offset: getOffset(start, posts?.recordsTotal, POSTS_OFFSET),
      data: posts?.data || []
    }
  }
}

function errorGetPosts(message) {
  return {
    type: GET_POSTS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function getPosts(api, opts) {
  return async dispatch => {
    dispatch(requestGetPosts());

    const url = generateUrl('getPosts');
    try {
      const { status, data } = await api
        .setMethod('GET')
        .setParams({
          start: opts.offset,
          length: opts.length
        })
        .query(url);

      if (status !== 200) {
        throw data?.message;
      }

      dispatch(receiveGetPosts(data, opts.offset));
    } catch (e) {
      dispatch(errorGetPosts("Error: something went wrong:", e));
    }
  }
}