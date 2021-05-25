import React, { useEffect, useContext, useCallback } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Box, Grid, Typography, Hidden, Link as MUILink } from "@material-ui/core";

import { PostsList } from "../../domain/PostsList";
import { HotStreamersItemList } from "../../domain/Stream";

import * as actionSuggestion from "../../store/actions/suggestion";

import * as postActions from "../../store/actions/post";
import * as settingsActions from "../../store/actions/settings";
import * as storyActions from "../../store/actions/story";
import * as streamActions from "../../store/actions/stream";

import * as paymentActions from "../../store/actions/payment";

import { RelationshipList } from "../../components/RelationshipList";
import { PreviewStoriesList } from "../../domain/StoriesLists";

import ApiContext from "../../context/ApiContext";
import { STORIES_LENGTH } from "../../constants/feed";
import { SUGESTED_PEOPLE } from "../../constants/routes";

import useShareDialog, { SHARE_DIALOG_POST_TYPE } from "../../hooks/useShareDialog";
import { useLikeAction, useFavoriteAction, useStoryDialog, useMenuDialog, useCommentAction } from "../../hooks/post";
import {
  useSendTipDialog,
  usePaymentDialog,
  usePurchaseDialog,
  useReceiptDialog,
  useFollowDialog,
} from "../../hooks/payment";
import useFullScreen from "../../hooks/useFullScreen";
import useLightboxModal from "../../hooks/useLightboxModal";

import useStyles from "./styles";

function Feed(props) {
  const classes = useStyles();
  const apiClient = useContext(ApiContext);

  const { userInfo } = props;
  const { people, getPeople } = props;
  const { posts, getPosts, resetPosts } = props;
  const { story, getStory, getFollowingStories, resetFollowingStories, resetStory } = props;
  const { hotStreamers, getHotStreamers } = props;

  const likeAction = useLikeAction();
  const favoriteAction = useFavoriteAction();
  const followDialog = useFollowDialog();
  const sendTipDialog = useSendTipDialog();
  const buyPostDialog = usePaymentDialog({ isFetching: props.posts.isFetching, onPayment: props.buyPost }); //buy ticket
  const receiptDialog = useReceiptDialog({ isFetching: props.posts.isFetching, onReceipt: props.getReceipt });
  const purchaseDialog = usePurchaseDialog({ isFetching: props.posts.isFetching, onPurchases: props.getPurchases });
  const createStoryDialog = useStoryDialog();
  const postMenuDialog = useMenuDialog();
  const fullScreen = useFullScreen("root");
  const { handleCommentSendClick } = useCommentAction();
  const lightboxModal = useLightboxModal();
  const shareDialog = useShareDialog({ type: SHARE_DIALOG_POST_TYPE });

  useEffect(() => {
    getPosts(apiClient, { userId: userInfo.id });
    getFollowingStories(apiClient, { length: STORIES_LENGTH });
    getHotStreamers(apiClient);

    return () => {
      resetPosts();
      resetFollowingStories();
    };
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      getPeople(apiClient, 4);
    }
  }, [userInfo.id]);

  const handleFetchMore = (isLoading) => {
    if (!isLoading) {
      getPosts(apiClient, { id: userInfo.id });
    }
  };

  const handleJoinStream = () => {
    console.log("handleJoinStream");
  };

  const handleStoryClick = () => {
    fullScreen.toggle(true);
  };

  return (
    <Container className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} md={8}>
          <PreviewStoriesList
            loading={story.isFetching}
            user={userInfo}
            items={story.data}
            onItemClick={handleStoryClick}
            onCreateStoryClick={createStoryDialog.toggle}
          />

          <PostsList
            user={userInfo}
            items={posts.data}
            hasMore={posts.hasMore}
            onFetchMore={handleFetchMore}
            onLike={likeAction.toggle}
            onFavorite={favoriteAction.toggle}
            onSendTip={sendTipDialog.toggle}
            onBuyPost={buyPostDialog.toggle}
            onReceipt={receiptDialog.toggle}
            onPurchase={purchaseDialog.toggle}
            onShare={shareDialog.toggle} //??
            onMenu={postMenuDialog.toggle} //??
            onCommentSend={handleCommentSendClick}
            onFullScreen={lightboxModal.toggle}
          />

        </Grid>
        <Hidden smDown>
          <Grid item md={4}>
            <Box position="sticky" top="4rem" paddingLeft="24px">
              {people.data && people.data.length > 0 && (
                <Box>
                  <Box mb={1} display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                    <Typography variant="h6">Suggestions For You</Typography>
                    <MUILink variant="caption" to={SUGESTED_PEOPLE} component={Link}>
                      See All
                    </MUILink>
                  </Box>
                  <RelationshipList wide={true} items={people.data} onSubscribeClick={followDialog.toggle} />
                </Box>
              )}

              {hotStreamers.data && hotStreamers.data.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Hot Streamers
                  </Typography>
                  <HotStreamersItemList items={hotStreamers.data} onJoinStream={handleJoinStream} />
                </Box>
              )}
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.signIn?.userInfo,

    posts: {
      isFetching: state.posts.isFetching,
      data: state.posts.data,
      errorMessage: state.posts.errorMessage,
      hasMore: state.posts.hasMore,
    },

    media: {
      isFetching: state.media.isFetching,
      data: state.media.data,
    },

    people: {
      isFetching: state.users.isFetching,
      data: state.users.data,
      errorMessage: state.users.errorMessage,
    },

    story: {
      isFetching: state.story.isFetching,
      data: state.story.data,
      errorMessage: state.story.errorMessage,
      hasMore: state.story.hasMore,
    },

    hotStreamers: {
      isFetching: state.stream.isFetching,
      data: state.stream?.hotStreamers,
      errorMessage: state.stream.errorMessage,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (api, opts) => dispatch(postActions.getFollowingPosts(api, opts)),
    getPurchases: (api, id, callback) => dispatch(postActions.getPurchases(api, id, callback)),
    getReceipt: (api, id, callback) => dispatch(postActions.getReceipt(api, id, callback)),
    resetPosts: () => dispatch(postActions.resetPosts()),

    getPeople: (api, count) => dispatch(actionSuggestion.getPeople(api, count)),
    buyPost: (api, id) => dispatch(paymentActions.buyPost(api, id)),

    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: (api, opts) => dispatch(storyActions.resetStory(api, opts)),
    resetFollowingStories: () => dispatch(storyActions.resetFollowingStories()),
    getFollowingStories: (api, opts) => dispatch(storyActions.getFollowingStories(api, opts)),

    getHotStreamers: (api) => dispatch(streamActions.getHotStreamers(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
