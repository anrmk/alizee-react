import React, { useContext, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Card, CardMedia, Hidden, IconButton } from "@material-ui/core/";
import FullscreenIcon from "@material-ui/icons/FullscreenRounded";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExitRounded";
import ImageIcon from "@material-ui/icons/ImageRounded";
import CommentIcon from "@material-ui/icons/CommentRounded";

import ApiContext from "../../context/ApiContext";
import { Tools, Comments } from "../../components/Post";
import MediaContent from "../../components/MediaContent";
import { COMMENTS_POST_LENGTH } from "../../constants/feed";
import * as postActions from "../../store/actions/post";
import * as commentActions from "../../store/actions/comment";

import { HOME_ROUTE } from "../../constants/routes";
import SlidingViews from "../../components/SlidingViews";
import useSlidingViews from "../../hooks/useSlidingViews";
import usePostActions from "../../hooks/usePostActions";

import useStyles from "./styles";

function PostPage(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const { currentSlidingViewsState, toggleSlidingViewsState, priorityViewSlidingViews } = useSlidingViews();

  const postId = props.match.params.id;

  const { user, post, comment } = props;
  const {
    getPost,
    getComments,
    resetComments,
    createComment
  } = props;

  const { favoriteAction, likeAction, goToAction, dialogToggleAction } = usePostActions({
    isFetching: props.post.isFetching,
    onPurchases: props.getPurchases,
    onReceipt: props.getReceipt,
    onBuy: props.buyPost,
    onFavorite: props.favoritePost,
    onLike: props.likePost,
  });

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

  const handleSendMessageClick = useCallback(async (text) => {
    !comment.isFetching && await createComment(apiClient, { postId, text });
  }, []);

  if (post.errorMessage) {
    return <Redirect to={HOME_ROUTE} />
  }

  return (
    <Container className={classes.container}>
      <SlidingViews
        currentState={currentSlidingViewsState}
        firstSize={8}
        secondSize={4}>
        <Card className={classes.card} variant="outlined">
          <CardMedia className={classes.cardMedia}>
            <Hidden smDown>
              <IconButton className={classes.iconToggle} onClick={toggleSlidingViewsState}>
                {priorityViewSlidingViews === currentSlidingViewsState ? <FullscreenIcon /> : <FullscreenExitIcon />}
              </IconButton>
            </Hidden>
            <Hidden mdUp>
              <IconButton className={classes.iconToggle} onClick={toggleSlidingViewsState}>
                <CommentIcon />
              </IconButton>
            </Hidden>
            <MediaContent items={post.data.media} amount={post.data.amount} isPurchased={post.data.isPurchased} />
          </CardMedia>
        </Card>
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
          onSendMessageClick={handleSendMessageClick}
          headerBackComponent={
            <Hidden mdUp>
              <IconButton onClick={toggleSlidingViewsState}>
                <ImageIcon />
              </IconButton>
            </Hidden>
          }>
          <Tools
            id={post.data.id}
            likes={post.data.likes}
            iLike={post.data.iLike}
            isFavorite={post.data.isFavorite}
            amount={post.data.amount}
            isPurchased={post.data.isPurchased}
            isOwner={user.id === post.data.user?.id}
            
            onLikeClick={likeAction}
            onFavoriteClick={favoriteAction}
            onDialogToggle={dialogToggleAction} />
        </Comments>
      </SlidingViews>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    user: state.signIn?.userInfo,
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
    getPurchases: (api, id, callback) => dispatch(postActions.getPurchases(api, id, callback)),
    getReceipt: (api, id, callback) => dispatch(postActions.getReceipt(api, id, callback)),
   
    favoritePost: (api, id) => dispatch(postActions.favoritePost(api, id)),

    getComments: (api, opts) => dispatch(commentActions.getCommentsPost(api, opts)),
    resetComments: () => dispatch(commentActions.resetCommentsPost()),
    createComment: (api, opts) => dispatch(commentActions.createCommentPost(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
