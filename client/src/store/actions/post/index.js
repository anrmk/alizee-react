export { 
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  RESET_POSTS,

  getPosts,
  resetPosts,
  getGridGalleryPosts
} from './getPosts';

export { 
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,

  fetchPost
} from './getPost';

export { 
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,

  createPost
} from './createPost';

export { 
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  likePost
} from './likePost';