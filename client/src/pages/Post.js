import React, { useContext, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Box, Grid, Card, CardMedia } from "@material-ui/core/";

import ApiContext from "../context/ApiContext";
import { Tools, Comments } from "../components/Post";
import MediaContent from "../components/MediaContent";
import usePostDialog from "../hooks/usePostDialog";
import { COMMENTS_POST_LENGTH } from "../constants/feed";
import * as postActions from "../store/actions/post";
import * as commentActions from "../store/actions/comment";

import { HOME_ROUTE } from "../constants/routes";

function PostPage(props) {
  const apiClient = useContext(ApiContext);

  const postId = props.match.params.id;

  const { post, comment } = props;
  const {
    getPost,
    likePost,
    buyPost,
    favoritePost,
    getComments,
    resetComments,
    createComment
  } = props;

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

  const handleCommentMore = async () => {
    !comment.isFetching && await getComments(apiClient, { postId, length: COMMENTS_POST_LENGTH });
  };

  const handleLikeClick = useCallback(async (id) => {
    !post.isFetching && await likePost(apiClient, id);
  }, []);

  const handleFavoriteClick = useCallback(async (id) => {
    !post.isFetching && await favoritePost(apiClient, id);
  }, []);

  const handleSendMessageClick = useCallback(async (text) => {
    !comment.isFetching && await createComment(apiClient, { postId, text });
  }, []);

  const handlePayConfirmClick = useCallback(async ({ id }) => {
    console.log("ID", id);
    !post.isFetching && await buyPost(apiClient, id);
  }, []);

  const handleDialogToggle = (data, type) => {
    postDialog.toggleDialog(type, true, data);
  };

  const postDialog = usePostDialog({ onPayClick: handlePayConfirmClick });

  if (post.errorMessage) {
    return <Redirect to={HOME_ROUTE} />
  }

  return (
    <Container>
      <Grid container spacing={2} direction="row">
          <Grid item md={8}>
            <Card variant="outlined">
              <CardMedia>
                <MediaContent items={post.data.media} amount={post.data.amount} isPurchased={post.data.isPurchased} />
              </CardMedia>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Comments
              userId={post.data.user?.id}
              avatarUrl={post.data.user?.avatarUrl}
              title={post.data.user?.name}
              subheader={post.data.user?.userName}
              description={post.data.description}
              items={comment.data}
              hasMore={comment.hasMore}
              isCommentable={post.data.isCommentable}
              onFetchMore={handleCommentMore}
              onSendMessageClick={handleSendMessageClick}>
              <Tools
                userId={post.data.user?.id}
                id={post.data.id}
                amount={post.data.amount}
                isFavorite={post.data.isFavorite}
                isPurchased={post.data.isPurchased}
                likes={post.data.likes}
                iLike={post.data.iLike}
                onLikeClick={handleLikeClick}
                onFavoriteClick={handleFavoriteClick}
                onDialogToggle={handleDialogToggle} />
            </Comments>
          </Grid>
        </Grid>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    post: {
      isFetching: state.posts.isFetching,
      errorMessage: state.posts.errorMessage,
      data: state.posts.currentPost
    },
    comment: {
      isFetching: state.comment.isFetching,
      data: state.comment.data,
      hasMore: state.comment.hasMore
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (api, id) => dispatch(postActions.fetchPost(api, id)),
    likePost: (api, id) => dispatch(postActions.likePost(api, id)),
    buyPost: (api, id) => dispatch(postActions.buyPost(api, id)),
    favoritePost: (api, id) => dispatch(postActions.favoritePost(api, id)),

    getComments: (api, opts) => dispatch(commentActions.getCommentsPost(api, opts)),
    resetComments: () => dispatch(commentActions.resetCommentsPost()),
    createComment: (api, opts) => dispatch(commentActions.createCommentPost(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
