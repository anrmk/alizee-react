import React, { useContext, useEffect } from 'react'
import { connect } from "react-redux";

import PostList from '../domain/PostsList';
import CreatePostForm from '../domain/CreatePostForm';
import Suggestion from '../components/Suggestion';

import * as postActions from '../store/actions/post';
import ApiContext from '../context/ApiContext';
import { POSTS_LENGTH } from '../constants/feed';

function Feed(props) {
  const apiClient = useContext(ApiContext);

  const { isFetching, hasMore, data, offset, errorMessage } = props;
  const { fetchPosts, createPost } = props;

  useEffect(() => {
    fetchPosts(apiClient, { offset, length: POSTS_LENGTH });
  }, []);

  const handleFetchMore = () => {
    fetchPosts(apiClient, { offset, length: POSTS_LENGTH });
  }

  const handleFormSubmit = async (formData, mediaData) => {
    if (!formData.description) return;

    createPost(apiClient, formData, mediaData);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <CreatePostForm onSubmit={handleFormSubmit} />
          <PostList 
            items={data}
            hasMore={hasMore}
            onFetchMore={handleFetchMore}/>
        </div>
        <div className="col-lg-4 d-none d-lg-block d-xl-block">
          <Suggestion />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    offset: state.posts.offset,
    data: state.posts.data,
    errorMessage: state.posts.errorMessage,
    hasMore: state.posts.hasMore,
    media: {
      isFetching: state.media.isFetching,
      data: state.media.data
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    createPost: async (api, post, media) => dispatch(postActions.createPost(api, post, media))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)