import React, { useContext, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import {
  Box,
  Card,
  CardMedia,
  Hidden,
  IconButton,
  Chip,
  Avatar,
} from "@material-ui/core/";
import ImageIcon from "@material-ui/icons/ImageRounded";
import CommentIcon from "@material-ui/icons/CommentRounded";
import MoreVertIcon from "@material-ui/icons/MoreVertRounded";

import ApiContext from "../../context/ApiContext";
import { Tools, Comments } from "../../components/Post";
import MediaContent from "../../components/MediaContent";
import SlidingViews from "../../components/SlidingViews";

import * as postActions from "../../store/actions/post";
import * as commentActions from "../../store/actions/comment";
import * as paymentActions from "../../store/actions/payment";

import { HOME_ROUTE, PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import useSlidingViews from "../../hooks/useSlidingViews";
import useShareDialog, {
  SHARE_DIALOG_POST_TYPE,
} from "../../hooks/useShareDialog";
import {
  useLikeAction,
  useFavoriteAction,
  useMenuDialog,
  useCommentDialog,
  useCommentAction,
} from "../../hooks/post";
import {
  useSendTipDialog,
  usePaymentDialog,
  usePurchaseDialog,
  useReceiptDialog,
} from "../../hooks/payment";
import useLightboxModal from "../../hooks/useLightboxModal";

import useStyles from "./styles";
import FundraisingPost from "../../components/FundraisingPost";

function PostPage(props) {
  const { id: postId } = useParams();
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const history = useHistory();
  const { currentSlidingViewsState, toggleSlidingViewsState } =
    useSlidingViews();

  const { user, post, comment } = props;
  const { getPost, getComments, resetComments, resetCurrentPost } = props;
  const { buyPost, getReceipt, getPurchases } = props;

  const likeAction = useLikeAction();
  const favoriteAction = useFavoriteAction();
  const sendTipDialog = useSendTipDialog();
  const buyPostDialog = usePaymentDialog({
    isFetching: post.isFetching,
    onPayment: buyPost,
  });
  const receiptDialog = useReceiptDialog({
    isFetching: post.isFetching,
    onReceipt: getReceipt,
  });
  const purchaseDialog = usePurchaseDialog({
    isFetching: post.isFetching,
    onPurchases: getPurchases,
  });
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
    getComments(apiClient, { postId });
    return () => {
      resetComments();
      resetCurrentPost();
    };
  }, []);

  if (post.errorMessage) {
    return <Redirect to={HOME_ROUTE} />;
  }

  const handleCommentMore = async () => {
    !comment.isFetching && (await getComments(apiClient, { postId }));
  };

  return (
    <Box className={classes.container}>
      <SlidingViews
        currentState={currentSlidingViewsState}
        firstSize={8}
        secondSize={4}>
        <Card className={classes.card} variant="elevation">
          <CardMedia className={classes.cardMedia}>
            <Hidden mdUp>
              <IconButton
                className={classes.iconToggle}
                onClick={toggleSlidingViewsState}>
                <CommentIcon />
              </IconButton>
            </Hidden>
            <MediaContent
              items={post.data.media}
              amount={post.data.amount}
              isPurchased={post.data.isPurchased}
              isOwner={user.userName === post.owner?.userName}
              onClick={lightboxModal.toggle}
            />
            {post.data.targetFunds > 0 && (
              <FundraisingPost
                positionDirection="top"
                fundraising={post.data.fundraising}
                targetFunds={post.data.targetFunds}
              />
            )}
            {post.data.userTags && post.data.userTags.length > 0 && (
              <Box className={classes.userTags}>
                {post.data.userTags?.map((item) => (
                  <Chip
                    clickable
                    avatar={<Avatar src={item.avatarUrl} />}
                    key={`tagged_${item.name}`}
                    label={item.name}
                    onClick={() =>
                      history.push(PROFILE_USERNAME_ROUTE(item.userName))
                    }
                  />
                ))}
              </Box>
            )}
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
          isFollowed={post.owner.isFollow}
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

              <IconButton
                onClick={() =>
                  postMenuDialog.toggle({
                    postId: post.data.id,
                    userName: post.owner.userName,
                    isOwner: user.userName === post.owner.userName,
                  })
                }>
                <MoreVertIcon />
              </IconButton>
            </>
          }>
          <Tools
            id={post.data.id}
            user={post.owner}
            likes={post.data.likes}
            isLike={post.data.iLike}
            isFavorite={post.data.isFavorite}
            isVerified={post.owner.identityVerified}
            amount={post.data.amount}
            isPurchased={post.data.isPurchased}
            isOwner={user.userName === post.owner.userName}
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
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    user: state.signIn?.userInfo,
    post: {
      isFetching: state.followingPosts.isFetching,
      errorMessage: state.followingPosts.errorMessage,
      data: state.followingPosts.currentPost,
      owner: state.followingPosts.currentPost.user || {},
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
    getPost: (api, id) => dispatch(postActions.getPost(api, id)),
    getPurchases: (api, id, callback) =>
      dispatch(postActions.getPurchases(api, id, callback)),
    getReceipt: (api, id, callback) =>
      dispatch(postActions.getReceipt(api, id, callback)),
    resetCurrentPost: (api, id) => dispatch(postActions.resetCurrentPost()),

    buyPost: (api, id) => dispatch(paymentActions.buyPost(api, id)),

    getComments: (api, opts) =>
      dispatch(commentActions.getCommentsPost(api, opts)),
    resetComments: () => dispatch(commentActions.resetCommentsPost()),
    // createComment: (api, opts) => dispatch(commentActions.createCommentPost(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);