import React, { useContext, useEffect } from 'react'
import { connect } from "react-redux";

import PostList from '../domain/PostsList';
import Suggestion from '../components/Suggestion';

import { getPosts } from '../store/actions/posts';
import ApiContext from '../context/ApiContext';
import { POSTS_LENGTH } from '../constants/feed';

function Feed(props) {
  const apiClient = useContext(ApiContext);

  const { isFetching, data, offset, errorMessage } = props;
  const { fetchPosts } = props;

  useEffect(() => {
    fetchPosts(apiClient, { offset, length: POSTS_LENGTH });
  }, []);

  const handleFetchMore = () => {
    fetchPosts(apiClient, { offset, length: POSTS_LENGTH });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <PostList items={data} onFetchMore={handleFetchMore} />
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
    data: state.posts?.data,
    errorMessage: state.posts.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (api, opts) => dispatch(getPosts(api, opts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)