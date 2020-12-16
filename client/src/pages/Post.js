import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";
import { Post, Tools, Comments } from "../components/Post";
import { COMMENTS_POST_LENGTH } from "../constants/feed";
import * as postActions from "../store/actions/post";
import * as commentActions from "../store/actions/comment";

import { Container, Box, Grid } from "@material-ui/core/";

function PostPage(props) {
  const apiClient = useContext(ApiContext);

  const { post, comment } = props;
  const { getPost, likePost, getComments, createComment } = props;
  const postId = props.match.params.id;

  useEffect(() => {
    if (!postId) {
      return <Redirect to="/" />;
    }

    (async () => {
      await getPost(apiClient, postId);
      await getComments(apiClient, { postId, length: COMMENTS_POST_LENGTH });
    })();
  }, []);

  const handleCommentMore = (isLoading) => {
    if (!isLoading) {
      (async () => {
        await getComments(apiClient, { postId, length: COMMENTS_POST_LENGTH });
      })();
    }
  };

  const handleOnFavoriteClick = (id, isLoading) => {
    !isLoading && likePost(apiClient, id);
  };

  const handleSendMessageClick = (text) => {
    createComment(apiClient, { postId, text });
  };

  const renderLoader = () => <div className="d-flex justify-content-center">{/* <Spinner animation="grow" /> */}</div>;

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={2} direction="row">
          <Grid item md={8}>
            {post.isFetching ? (
              renderLoader()
            ) : (
              <Post
                hideHeader
                hideToolbar
                hideContent
                id={post.data?.id}
                mediaUrls={post.data?.media}
                amount={post.data?.amount}
              />
            )}
          </Grid>
          <Grid item md={4}>
            {
              <Comments
                userId={post.data?.user?.id}
                avatarUrl={post.data?.user?.avatarUrl}
                title={post.data?.user?.name}
                subheader={post.data?.user?.userName}
                description={post.data?.description}
                items={comment.data}
                hasMore={comment.hasMore}
                onFetchMore={() => handleCommentMore(comment.isFetching)}
                onSendMessageClick={handleSendMessageClick}
              >
                <Tools
                  userId={post.data?.user?.id}
                  id={post.data?.id}
                  amount={post.data.amount}
                  isPurchased={post.data.isPurchased}
                  commentable={post.data?.isCommentable}
                  likes={post.data?.likes}
                  iLike={post.data?.iLike}
                  hideCommentable={true}
                  hideWatch={true}
                  onFavoriteClick={(id) => handleOnFavoriteClick(post.data.id, post.isFetching)}
                />
              </Comments>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    post: {
      isFetching: state.posts.isFetching,
      data: state.posts.currentPost,
    },
    comment: {
      isFetching: state.comment.isFetching,
      data: state.comment.data,
      hasMore: state.comment.hasMore,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (api, id) => dispatch(postActions.fetchPost(api, id)),
    likePost: (api, id) => dispatch(postActions.likePost(api, id)),
    getComments: (api, opts) => dispatch(commentActions.getCommentsPost(api, opts)),
    createComment: (api, opts) => dispatch(commentActions.createCommentPost(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
