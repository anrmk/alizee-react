import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { Container, Box } from "@material-ui/core/";

import { Post, Tools } from "../components/Post";
import { AvatarItem } from "../components/Avatar";

import * as postActions from '../store/actions/post';
import ApiContext from "../context/ApiContext";

function PostPage(props) {
  const apiClient = useContext(ApiContext);

  const { isFetching, data } = props;
  const { getPost, likePost } = props;
  const postId = props.match.params.id;

  useEffect(() => {
    if (!postId) {
      return <Redirect to="/" />;
    }

    (async () => {
      await getPost(apiClient, postId);
    })();
  }, []);

  const handleOnFavoriteClick = (id, isLoading) => {
    !isLoading && likePost(apiClient, id);
  }

  const renderLoader = () => (
    <div className="d-flex justify-content-center">
      {/* <Spinner animation="grow" /> */}
    </div>
  );

  return (
    <Container>
      <Box my={4}>
        <div className="row">
          <div className="col-lg-8 col-md-12">
            {isFetching ? (
              renderLoader()
            ) : (
              <Post
                hideToolbar
                hideHeader
                id={data?.id}
                userId={data?.user?.id}
                avatarUrl={data?.user?.avatarUrl}
                mediaUrls={data?.media}
                altText={data?.altText}
                description={data?.description}
                username={data?.user?.userName}
                amount={data?.amount}
                commentable={data?.isCommentable}
              />
            )}
          </div>
          <div className="col-lg-4 d-none d-lg-block d-xl-block">
            <div className="p-2 mb-3 border-bottom">
              <AvatarItem
                url={data?.user?.avatarUrl}
                title={data?.user?.userName}
                subtitle={data?.createdDate}
              />
            </div>
            <Tools
              userId={data?.user?.id}
              id={data?.id}
              commentable={data?.isCommentable}
              likes={data?.likes}
              iLike={data?.iLike}
              onFavoriteClick={(id) =>
                handleOnFavoriteClick(data.id, isFetching)
              }
            />
          </div>
        </div>
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    data: state.posts.currentPost,
    //errorMessage: state.posts.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (api, id) => dispatch(postActions.fetchPost(api, id)),
    likePost: (api, id) => dispatch(postActions.likePost(api, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
