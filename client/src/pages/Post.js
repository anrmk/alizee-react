import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";
import { Post, Tools, Comments } from "../components/Post";
import { COMMENTS_POST_LENGTH } from "../constants/feed";
import * as postActions from "../store/actions/post";
import * as commentActions from "../store/actions/comment";

import { Container, Grid } from "@material-ui/core/";

function PostPage(props) {
  const apiClient = useContext(ApiContext);

  const postId = props.match.params.id;

  const { post, comment } = props;
  const { getPost, likePost, getComments, resetComments, createComment } = props;

  useEffect(() => {
    if (!postId) {
      return <Redirect to="/" />;
    }

    (async () => {
      await getPost(apiClient, postId);
      await getComments(apiClient, { postId, length: COMMENTS_POST_LENGTH });
    })();
    return () => {
      resetComments();
    };
  }, []);

  const handleCommentMore = (isLoading) => {
    if (!isLoading) {
      (async () => {
        await getComments(apiClient, { postId, length: COMMENTS_POST_LENGTH });
      })();
    }
  };

  const handleLikeClick = async (id, isLoading) => {
    !isLoading && (await likePost(apiClient, id));
  };

  const handleFavoriteClick = (id, isLoading) => {
    !isLoading && likePost(apiClient, id);
  };

  const handleSendMessageClick = (text) => {
    createComment(apiClient, { postId, text });
  };

  return (
    <Container>
      <Grid container spacing={2} direction="row">
          <Grid item md={8}>
            {!post.isFetching && (
              <Post hideHeader hideToolbar hideContent id={post.id} mediaUrls={post.media} amount={post.amount} isPurchased={post.isPurchased} />
            )}
          </Grid>
          <Grid item md={4}>
            {!post.isFetching && (
              <Comments
                userId={post.user?.id}
                avatarUrl={post.user?.avatarUrl}
                title={post.user?.name}
                subheader={post.user?.userName}
                description={post.description}
                items={comment.data}
                hasMore={comment.hasMore}
                isCommentable={post.isCommentable}
                onFetchMore={() => handleCommentMore(comment.isFetching)}
                onSendMessageClick={handleSendMessageClick}
              >
                <Tools
                  userId={post.user?.id}
                  id={post.id}
                  amount={post.amount}
                  isPurchased={post.isPurchased}
                  isCommentable={post.isCommentable}
                  likes={post.likes}
                  iLike={post.iLike}
                  hideCommentable={true}
                  hideWatch={true}
                  onLikeClick={(id) => handleLikeClick(post.id, post.isFetching)}
                  onFavoriteClick={(id) => handleFavoriteClick(post.id, post.isFetching)}
                />
              </Comments>
            )}
          </Grid>
        </Grid>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    post: {
      isFetching: state.posts.isFetching,
      ...state.posts.currentPost,
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
    resetComments: () => dispatch(commentActions.resetCommentsPost()),
    createComment: (api, opts) => dispatch(commentActions.createCommentPost(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
