import { generateUrl, generateFileUrl, getOffset } from '../../../helpers/functions';
import { POSTS_OFFSET } from '../../../constants/feed';

export const GET_FOLLOWING_POSTS_REQUEST = 'GET_FOLLOWING_POSTS_REQUEST';
export const GET_FOLLOWING_POSTS_SUCCESS = 'GET_FOLLOWING_POSTS_SUCCESS';
export const GET_FOLLOWING_POSTS_FAILURE = 'GET_FOLLOWING_POSTS_FAILURE';

function requestGetFollowingPosts() {
  return {
    type: GET_FOLLOWING_POSTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveGetFollowingPosts(posts, total, start, hasMore) {
  return {
    type: GET_FOLLOWING_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      offset: getOffset(start, total, POSTS_OFFSET),
      hasMore,
      data: posts || []
    }
  }
}

function errorGetFollowingPosts(message) {
  return {
    type: GET_FOLLOWING_POSTS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message
    }
  }
}

export function getFollowingPosts(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetFollowingPosts());

    const url = generateUrl('getFollowingPosts');
    const currentOffset = getState().posts.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: opts.length,
        })
        .query(url);

      // Extend relative path to absolute (to remote server)
      data.data.forEach((item) => {
        const avatarUrl = item.user.avatarUrl;
        item.user = {
          ...item.user,
          avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, avatarUrl),
        };
        item.iLike = true;
        item.media.forEach((item) => {
          item.url = generateFileUrl(process.env.REACT_APP_DOMAIN, item.url);
          item.thumbnailUrl = generateFileUrl(
            process.env.REACT_APP_DOMAIN,
            item.thumbnailUrl
          );
        });
      });

      dispatch(
        receiveGetFollowingPosts(
          [...getState().posts.data, ...data.data],
          data.recordsTotal,
          currentOffset,
          !!data.data.length
        )
      );
    } catch (e) {
      dispatch(errorGetFollowingPosts("Error: something went wrong:", e));
    }
  }
}