import { generateUrl } from "../../../helpers/functions";
import { MEDIA_CONTENT } from "../../../constants/media_types";
import { updateProfilePosts } from "./updateProfilePosts";

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

function receiveCreatePost(data) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
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

export function createPost(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCreatePost());

    const posts = getState().followingPosts.data;
    const user = getState().user.data;

    const url = generateUrl("createPost");
    try {
      const {
        amount,
        isTargetFunds,
        description,
        commentable,
        isExplorable,
        userTags,
        medias,
      } = opts;

      const formData = new FormData();
      formData.append("amount", (amount && Number(amount)) || 0);
      formData.append("isTargetFunds", isTargetFunds);
      formData.append("description", description);
      formData.append("isCommentable", commentable);
      formData.append("isExplorable", isExplorable);

      userTags &&
        userTags.forEach((userName) => {
          formData.append("userNames", userName);
        });

      medias &&
        medias.forEach((file) => {
          formData.append("files", file);
        });

      const { data } = await api
        .setParams({ mediaType: MEDIA_CONTENT })
        .setData(formData)
        .query(url);

      if (!data) throw new Error("Data is undefined");

      if (user?.userName === data.user.userName) {
        dispatch(updateProfilePosts(data));
      }
      opts.location || posts.length > 0
        ? dispatch(receiveCreatePost([data, ...posts]))
        : dispatch(receiveCreatePost([]));
    } catch (e) {
      dispatch(errorCreatePost("Error: something went wrong"));
    }
  };
}
