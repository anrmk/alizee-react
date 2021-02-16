import React, { useContext, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Card, CardMedia, Hidden, IconButton } from "@material-ui/core/";
import FullscreenIcon from "@material-ui/icons/FullscreenRounded";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExitRounded";
import ImageIcon from "@material-ui/icons/ImageRounded";
import CommentIcon from "@material-ui/icons/CommentRounded";

import ApiContext from "../../context/ApiContext";
import { Tools, Menu, Comments } from "../../components/Post";
import MediaContent from "../../components/MediaContent";
import SlidingViews from "../../components/SlidingViews";

import * as postActions from "../../store/actions/post";
import * as settingsActions from "../../store/actions/settings";
import * as relationshipActions from "../../store/actions/relationship";
import * as commentActions from "../../store/actions/comment";
import * as paymentActions from "../../store/actions/payment";

import { COMMENTS_POST_LENGTH } from "../../constants/feed";
import { HOME_ROUTE } from "../../constants/routes";
import useSlidingViews from "../../hooks/useSlidingViews";
import usePostActions from "../../hooks/usePostActions";
import useProfileActions from "../../hooks/useProfileActions";
import { useSendTipDialog, usePaymentDialog } from "../../hooks/payment";

import useStyles from "./styles";

function PostPage(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const { currentSlidingViewsState, toggleSlidingViewsState, priorityViewSlidingViews } = useSlidingViews();

  const postId = props.match.params.id;

  const { user, post, comment } = props;
  const { getPost, getComments, resetComments, createComment } = props;
  const { createFollow, deleteFollow, blockUser, unblockUser, reportUser } = props;

  const sendTipDialog = useSendTipDialog({ onSendTip: props.sendTip})
  const buyPostDialog = usePaymentDialog({ onPayment: props.buyPost });

  const profileAction = useProfileActions({
    onFollow: createFollow,
    onUnfollow: deleteFollow,
    onBlock: blockUser,
    onUnblock: unblockUser,
    onReport: reportUser,
  })

  const postAction = usePostActions({
    isFetching: props.post.isFetching,
    onLike: props.likePost,
    onFavorite: props.favoritePost,
    onPurchases: props.getPurchases,
    onReceipt: props.getReceipt,
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

  const handleSendMessageClick = useCallback(async ({media, message}) => {
    !comment.isFetching && await createComment(apiClient, { postId, message });
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
          userId={post.owner?.id}
          avatarUrl={post.owner?.avatarUrl}
          title={post.owner?.name}
          subheader={post.owner?.userName}
          description={post.data.description}
          items={comment.data}
          hasMore={comment.hasMore}
          isCommentable={post.data.isCommentable}
          onFetchMore={handleCommentMore}
          onSendMessageClick={handleSendMessageClick}
          headerBackComponent={
            <>
              <Hidden mdUp>
                <IconButton onClick={toggleSlidingViewsState}>
                  <ImageIcon />
                </IconButton>
              </Hidden>
              <Menu 
                user={post.owner}
                isOwner={user.id === post.owner?.id}

                onFollow={profileAction.follow}
                onUnfollow={profileAction.unfollow}
                onBlock={profileAction.block}
                onUnblock={profileAction.unblock}
                onReport={profileAction.report}
              />
            </>
          }>
          <Tools
            id={post.data.id}
            user={post.owner}
            likes={post.data.likes}
            isLike={post.data.iLike}

            amount={post.data.amount}
            isFavorite={post.data.isFavorite}
            amount={post.data.amount}
            isPurchased={post.data.isPurchased}
            isOwner={user.id === post.owner?.id}
            
            onLike={postAction.like}
            onFavorite={postAction.favorite}
            onSendTip={sendTipDialog.toggle}
            onBuyPost={buyPostDialog.toggle}
            onDialogToggle={postAction.dialogToggleAction} />
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
      data: state.posts.currentPost,
      owner: state.posts.currentPost.user || {}
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
    getPost: (api, id) => dispatch(postActions.getPost(api, id)),
    likePost: (api, id) => dispatch(postActions.likePost(api, id)),
    getPurchases: (api, id, callback) => dispatch(postActions.getPurchases(api, id, callback)),
    getReceipt: (api, id, callback) => dispatch(postActions.getReceipt(api, id, callback)),
    favoritePost: (api, id) => dispatch(postActions.favoritePost(api, id)),

    buyPost: (api, id) => dispatch(paymentActions.buyPost(api, id)),
    sendTip: (api, userName, amount, message) => dispatch(paymentActions.sendTip(api, userName, amount, message)),

    createFollow: (api, id) => dispatch(relationshipActions.createFollow(api, id)),
    deleteFollow: (api, id) => dispatch(relationshipActions.deleteFollow(api, id)),
    blockUser: (api, id) => dispatch(settingsActions.createBlackList(api, id)),
    unblockUser: (api, id) => dispatch(settingsActions.deleteBlackList(api, id)),
    reportUser: (api, id) => {console.log("Report user")},  

    getComments: (api, opts) => dispatch(commentActions.getCommentsPost(api, opts)),
    resetComments: () => dispatch(commentActions.resetCommentsPost()),
    createComment: (api, opts) => dispatch(commentActions.createCommentPost(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
