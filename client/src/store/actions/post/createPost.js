import { generateUrl } from "../../../helpers/functions";
import { POST_PRIVATE, POST_PUBLIC } from "../../../constants/feed";
import { MEDIA_CONTENT } from "../../../constants/media_types";
import { createMedia } from "../media";

export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

function requestCreatePost() {
  return {
    type: CREATE_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreatePost(posts) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: posts,
    },
  };
}

function errorCreatePost(message) {
  return {
    type: CREATE_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createPost(api, postData) {
  return async (dispatch, getState) => {
    dispatch(requestCreatePost());

    const url = generateUrl("createPost");
    try {
      const mediaData = postData.medias;
      let media = [];
      if (mediaData.length > 0) {
        await dispatch(createMedia(api, mediaData, MEDIA_CONTENT));

        const mediaErrorMessage = getState().media.errorMessage;
        if (mediaErrorMessage) {
          throw mediaErrorMessage;
        }

        media = getState().media.data;
      }

      const { data } = await api
        .setData({
          amount: (postData.amount && Number(postData.amount)) || 0,
          description: postData.description,
          isCommentable: postData.commentable,
          kind: postData.mprivate ? POST_PRIVATE : POST_PUBLIC,
          latitude: postData?.latitude,
          longitude: postData?.longitude,
          media: media,
          userTags: postData.taggedUsers
        })
        .query(url);

      const posts = getState().followingPosts.data;

      if (getState().user.data?.userName && getState().signIn.userInfo.userName !== getState().user.data.userName) {
        dispatch(receiveCreatePost(posts));
      } else {
        const avatarUrl = getState().signIn?.userInfo?.avatarUrl;
        if (avatarUrl) {
          data.user.avatarUrl = avatarUrl;
        }

        dispatch(receiveCreatePost([data, ...posts]));
      }
    } catch (e) {
      dispatch(errorCreatePost("Error: something went wrong"));
    }
  };
}
