import React, { useContext, useEffect } from 'react'
import { connect } from "react-redux";
import { Spinner } from 'react-bootstrap';

import { Post } from '../domain/PostsList';
import Suggestion from '../components/Suggestion';
import { fetchPost } from '../store/actions/post';
import ApiContext from '../context/ApiContext';
import { Redirect } from 'react-router-dom';

function PostPage(props) {
  const apiClient = useContext(ApiContext);

  const { isFetching, data, errorMessage } = props;
  const { getPost } = props;
  const postId = props.match.params.id;

  useEffect(() => {
    if (!postId) {
      return <Redirect to="/" />
    }

    getPost(apiClient, postId);
  }, []);

  const renderLoader = () => (
    <div className="d-flex justify-content-center">
      <Spinner animation="grow" />
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          {isFetching 
            ? (
              renderLoader()
            )
            : (
              <Post 
              id={data?.id}
              userId={data?.user?.id}
              avatarUrl={data?.user?.avatarUrl}
              mediaUrls={data?.media}
              altText={data?.altText}
              description={data?.description}
              username={data?.user?.userName}
              amount={data?.amount}
              commentable={data?.isCommentable} />
            )
          }
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
    data: state.posts.currentPost,
    errorMessage: state.posts.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (api, id) => dispatch(fetchPost(api, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
