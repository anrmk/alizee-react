import React, { useContext, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Box, Grid, Card, CardMedia } from "@material-ui/core/";

import ApiContext from "../context/ApiContext";
import { Tools, Comments } from "../components/Post";
import MediaContent from "../components/MediaContent";
import usePostDialog, { RECEIPT_DIALOG_TYPE } from "../hooks/usePostDialog";
import { COMMENTS_POST_LENGTH } from "../constants/feed";
import * as postActions from "../store/actions/post";
import * as commentActions from "../store/actions/comment";

import usePostActions from "../hooks/usePostActions";

function PostPage(props) {
  const apiClient = useContext(ApiContext);

  const postId = props.match.params.id;

  const { post, comment } = props;
  const { getPost, getComments, resetComments, createComment } = props;

  const { buyAction, favoriteAction, likeAction, purachasesAction } = usePostActions({
    isFetching: props.post.isFetching,
    onPurchase: props.getPurchases,
    onBuy: props.buyPost,
    onFavorite: props.favoritePost,
    onLike: props.likePost
  })

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

  const handleSendMessage = useCallback(async (text) => {
    !comment.isFetching && await createComment(apiClient, { postId, text });
  }, []);

  const handleDialogToggle = async (data, type) => {
    if (type === RECEIPT_DIALOG_TYPE) {
      purachasesAction(data.id);
      if(!post.isFetching) {
        debugger
        postDialog.toggleDialog(type, true, post.data?.purchase);
      }
    } else {
      postDialog.toggleDialog(type, true, data);
    }
  };

  const postDialog = usePostDialog({ onPayClick: buyAction });

  // if (post.errorMessage) {
  //   return <Redirect to={HOME_ROUTE} />
  // }

  return (
    <Container>
      <Grid container spacing={2} direction="row">
          <Grid item md={8} sm={12}>
            <Card variant="outlined">
              <CardMedia>
                <MediaContent items={post.data.media} amount={post.data.amount} isPurchased={post.data.isPurchased} />
              </CardMedia>
            </Card>
          </Grid>
          <Grid item md={4} sm={12}>
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
              onSendMessageClick={handleSendMessage}>
              <Tools
                userId={post.data.user?.id}
                id={post.data.id}
                amount={post.data.amount}
                isFavorite={post.data.isFavorite}
                isPurchased={post.data.isPurchased}
                likes={post.data.likes}
                iLike={post.data.iLike}
                
                onLikeClick={likeAction}
                onFavoriteClick={favoriteAction}
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
    getPurchases: (api, id) => dispatch(postActions.getPurchases(api, id)),
    favoritePost: (api, id) => dispatch(postActions.favoritePost(api, id)),

    getComments: (api, opts) => dispatch(commentActions.getCommentsPost(api, opts)),
    resetComments: () => dispatch(commentActions.resetCommentsPost()),
    createComment: (api, opts) => dispatch(commentActions.createCommentPost(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
