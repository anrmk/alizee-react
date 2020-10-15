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

function receiveCreatePost(post) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      data: post
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

export function createPost(api, postData, mediaData=[]) {
  return async (dispatch, getState) => {
    dispatch(requestCreatePost());

    const url = generateUrl('createPost');
    try {
      let mediaFromState = [];
      if (mediaData.length > 0) {
        await dispatch(createMedia(api, mediaData));

        mediaFromState = getState().media.data;

        if (mediaFromState.errorMessage) {
          throw mediaFromState.errorMessage;
        }
      }


      const { status, data } = await api
        .setData({ 
          description: postData.description,
          altText: postData?.altText || postData.description,
          isCommentable: postData.commentable,
          kind: postData.private ? POST_PRIVATE : POST_PUBLIC,
          amount: Number(postData.amount),
          latitude: postData?.latitude,
          longitude: postData?.longitude,
          media: mediaFromState
         })
        .query(url);

      if (status !== 201) {
        throw data?.message;
      }

      // Extend relative path to absolute (to remote server)
      const avatarUrl = data.user.avatarUrl;
      data.user.avatarUrl = generateFileUrl(process.env.REACT_APP_TESTING_DOMAIN, avatarUrl);
      data.media.forEach(item => {
        item.url = generateFileUrl(process.env.REACT_APP_TESTING_DOMAIN, item.url);
      });

      dispatch(receiveCreatePost(data));
    } catch(e) {
      console.log(e)
      dispatch(errorCreatePost("Error: something went wrong"));
    }
  }
}
