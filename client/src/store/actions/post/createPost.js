import { generateUrl, generateFileUrl } from '../../../helpers/functions';
import { POST_PRIVATE, POST_PUBLIC } from '../../../constants/feed';
import { createMedia } from '../media';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

function requestCreatePost() {
  return {
    type: CREATE_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveCreatePost(posts) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      data: posts
    }
  }
}

function errorCreatePost(message) {
  return {
    type: CREATE_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function createPost(api, postData) {
  return async (dispatch, getState) => {
    dispatch(requestCreatePost());

    const url = generateUrl('createPost');
    try {
      const mediaData = postData.medias;
      let media = [];
      if (mediaData.length > 0) {
        await dispatch(createMedia(api, mediaData));

        const mediaErrorMessage = getState().media.errorMessage;
        if (mediaErrorMessage) {
          throw mediaErrorMessage;
        }

        media = getState().media.data;
      }

      const { data } = await api
        .setData({ 
          amount: postData.amount && Number(postData.amount) || 0,
          description: postData.description,
          isCommentable: postData.commentable,
          kind: postData.private ? POST_PRIVATE : POST_PUBLIC,
          latitude: postData?.latitude,
          longitude: postData?.longitude,
          media: media
         })
        .query(url);

      // Extend relative path to absolute (to remote server)
      const avatarUrl = getState().signIn?.userInfo?.avatarUrl;
      if (avatarUrl) {
        data.user.avatarUrl = avatarUrl;
      }
      data.media.forEach(item => {
        item.url = generateFileUrl(process.env.REACT_APP_DOMAIN, item.url);
      });

      const updatedPosts = [data, ...getState().posts.data];

      dispatch(receiveCreatePost(updatedPosts));
    } catch(e) {
      dispatch(errorCreatePost("Error: something went wrong"));
    }
  }
}
