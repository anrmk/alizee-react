import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Card, CardMedia, Hidden, IconButton } from "@material-ui/core/";
import FullscreenIcon from "@material-ui/icons/FullscreenRounded";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExitRounded";
import ImageIcon from "@material-ui/icons/ImageRounded";
import CommentIcon from "@material-ui/icons/CommentRounded";
import MoreVertIcon from "@material-ui/icons/MoreVertRounded";

import ApiContext from "../../context/ApiContext";
import { Tools, Comments } from "../../components/Post";
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

import useShareDialog, { SHARE_DIALOG_POST_TYPE } from "../../hooks/useShareDialog";
import { useLikeAction, useFavoriteAction, useMenuDialog, useCommentDialog, useCommentAction } from "../../hooks/post";
import { useSendTipDialog, usePaymentDialog, usePurchaseDialog, useReceiptDialog } from "../../hooks/payment";

import useStyles from "./styles";
import useLightboxModal from "../../hooks/useLightboxModal";

function PostPage(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const { currentSlidingViewsState, toggleSlidingViewsState, priorityViewSlidingViews } = useSlidingViews();

  const postId = props.match.params.id;

  const { user, post, comment } = props;
  const { getPost, getComments, resetComments, createComment, resetCurrentPost } = props;

  const likeAction = useLikeAction();
  const favoriteAction = useFavoriteAction();
  const sendTipDialog = useSendTipDialog();
  const buyPostDialog = usePaymentDialog({isFetching: props.post.isFetching, onPayment: props.buyPost });
  const receiptDialog = useReceiptDialog({ isFetching: props.post.isFetching, onReceipt: props.getReceipt });
  const purchaseDialog = usePurchaseDialog({ isFetching: props.post.isFetching, onPurchases: props.getPurchases });
  const postMenuDialog = useMenuDialog();
  const commentDialog = useCommentDialog();
  const { handleCommentSendClick } = useCommentAction();
  const lightboxModal = useLightboxModal();

  const shareDialog = useShareDialog({ type: SHARE_DIALOG_POST_TYPE });

  useEffect(() => {
    if (!postId) {
      return <Redirect to="/" />;
    }

    getPost(apiClient, postId);
    getComments(apiClient, { postId, length: COMMENTS_POST_LENGTH });
    return () => {
      resetComments();
	  resetCurrentPost()
    };
  }, []);

  if (post.errorMessage) {
    return <Redirect to={HOME_ROUTE} />
  }

  const handleCommentMore = async () => {
    !comment.isFetching && await getComments(apiClient, { postId, length: COMMENTS_POST_LENGTH });
  };

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
            <MediaContent
              items={post.data.media}
              amount={post.data.amount}
              isPurchased={post.data.isPurchased}
              isOwner={user.userName === post.owner?.userName}
              onClick={lightboxModal.toggle} />
          </CardMedia>
        </Card>
 
        <Comments
          postId={post.data.id}
          isOwner={user.userName === post.owner?.userName}
          user={user}
          owner={post.owner}
          description={post.data.description}
          items={comment.data}
          hasMore={comment.hasMore}
          isCommentable={post.data.isCommentable}
          isPurchased={post.data.isPurchased || post.data.amount === 0}
          onFetchMore={handleCommentMore}
          onCommentSendClick={handleCommentSendClick}
          onSendTip={sendTipDialog.toggle}
          onDeleteMessage={commentDialog.toggle}
          headerBackComponent={
            <>
              <Hidden mdUp>
                <IconButton onClick={toggleSlidingViewsState}>
                  <ImageIcon />
                </IconButton>
              </Hidden>

              <IconButton onClick={() => postMenuDialog.toggle({ 
                  postId: post.data.id,
                  userName: post.owner.userName,
                  isOwner: user.id === post.owner.id
                })}>
                <MoreVertIcon />
              </IconButton>
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
            isOwner={user.userName === post.owner?.userName}

            onLike={likeAction.toggle}
            onFavorite={favoriteAction.toggle}
            onSendTip={sendTipDialog.toggle}
            onBuyPost={buyPostDialog.toggle}
            onReceipt={receiptDialog.toggle}
            onPurchase={purchaseDialog.toggle}
            onShare={shareDialog.toggle}
            />
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
    getPurchases: (api, id, callback) => dispatch(postActions.getPurchases(api, id, callback)),
    getReceipt: (api, id, callback) => dispatch(postActions.getReceipt(api, id, callback)),
	resetCurrentPost: (api,id)=> dispatch(postActions.resetCurrentPost()),

    //createFollow: (api, id) => dispatch(relationshipActions.createFollow(api, id)),
    //deleteFollow: (api, id) => dispatch(relationshipActions.deleteFollow(api, id)),
    // blockUser: (api, id) => dispatch(settingsActions.createBlackList(api, id)),
    // unblockUser: (api, id) => dispatch(settingsActions.deleteBlackList(api, id)),

    buyPost: (api, id) => dispatch(paymentActions.buyPost(api, id)),

    getComments: (api, opts) => dispatch(commentActions.getCommentsPost(api, opts)),
    resetComments: () => dispatch(commentActions.resetCommentsPost()),
    createComment: (api, opts) => dispatch(commentActions.createCommentPost(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
