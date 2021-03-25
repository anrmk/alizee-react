import React, { useEffect, useContext, useCallback } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Typography,
  Hidden,
  Link as MUILink,
} from "@material-ui/core";

import { PostsList } from "../domain/PostsList";
import { HotStreamersItemList } from "../domain/Stream";

import * as actionSuggestion from "../store/actions/suggestion";

import * as postActions from "../store/actions/post";
import * as settingsActions from "../store/actions/settings";
import * as storyActions from "../store/actions/story";
import * as streamActions from "../store/actions/stream";

import * as relationshipActions from "../store/actions/relationship";
import * as paymentActions from "../store/actions/payment";

import { RelationshipList } from "../components/RelationshipList";
import { PreviewStoriesList } from "../domain/StoriesLists";

import ApiContext from "../context/ApiContext";
import { STORIES_LENGTH } from "../constants/feed";
import { SUGESTED_PEOPLE } from "../constants/routes";

import useProfileActions from "../hooks/useProfileActions";
import useShareDialog, { SHARE_DIALOG_POST_TYPE } from "../hooks/useShareDialog";
import { useLikeAction, useFavoriteAction, useStoryDialog, useMenuDialog } from "../hooks/post";
import { useSendTipDialog, usePaymentDialog, usePurchaseDialog, useReceiptDialog } from "../hooks/payment";

// Spacing between grid item (Aziz)
// const useStyles = makeStyles((theme) => ({
//   root: {
//     [theme.breakpoints.down("sm")]: {
//       padding: 0
//     }
//   }
// }));

function Feed(props) {
  // const classes = useStyles();
  const apiClient = useContext(ApiContext);

  const { userInfo } = props;
  const { blockUser, unblockUser, reportUser } = props;
  const { people, getPeople, createFollow, deleteFollow } = props;
  const { posts, getPosts, resetPosts } = props;
  const { story, getStory, getFollowingStories, resetFollowingStories, resetStory } = props;
  const { hotStreamers, getHotStreamers } = props;

  const sendTipDialog = useSendTipDialog();
  const buyPostDialog = usePaymentDialog({isFetching: props.posts.isFetching, onPayment: props.buyPost }); //buy ticket
  const purchaseDialog = usePurchaseDialog({isFetching: props.posts.isFetching, onPurchases: props.getPurchases });
  const receiptDialog = useReceiptDialog({isFetching: props.posts.isFetching, onReceipt: props.getReceipt }); 
  const likeAction = useLikeAction();
  const favoriteAction = useFavoriteAction();
  const createStoryDialog = useStoryDialog();
  const postMenuDialog = useMenuDialog();

  const { dialogShareOpenClick } = useShareDialog({ type: SHARE_DIALOG_POST_TYPE });

  const profileAction = useProfileActions({
    onFollow: createFollow,
    onUnfollow: deleteFollow,
    onBlock: blockUser,
    onUnblock: unblockUser,
    onReport: reportUser,
  });

  useEffect(() => {
    (async () => {
      await getPosts(apiClient, { userId: userInfo.id });
      await getStory(apiClient, { username: userInfo.userName, length: STORIES_LENGTH });
      await getFollowingStories(apiClient, { length: STORIES_LENGTH });
      await getHotStreamers(apiClient);
    })();

    return () => {
      resetPosts();
      resetStory();
      resetFollowingStories();
    };
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      (async () => {
        await getPeople(apiClient, 4);
      })();
    }
  }, [userInfo.id]);

  const handleFetchMore = (isLoading) => {
    if (!isLoading) {
      (async () => {
        await getPosts(apiClient, { id: userInfo.id });
      })();
    }
  };

  const handleFollowPeople = useCallback(async ({ userName, isFollow }) => {
    !people.isFetching && isFollow ? await deleteFollow(apiClient, userName) : await createFollow(apiClient, userName);
  }, []);

  const handleJoinStream = () => {
    console.log("handleJoinStream");
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <PreviewStoriesList
            loading={story.isFetching}
            userStory={story.data.mStories}
            items={story.data.fStories}
            onCreateStoryClick={createStoryDialog.toggle}
          />

          <PostsList
            user={userInfo}
            items={posts.data}
            hasMore={posts.hasMore}
            onFetchMore={handleFetchMore}
            onFollow={profileAction.follow}
            onUnfollow={profileAction.unfollow}
            onBlock={profileAction.block}
            onUnblock={profileAction.unblock}
            onReport={profileAction.report}

            onLike={likeAction.toggle}
            onFavorite={favoriteAction.toggle}
            onSendTip={sendTipDialog.toggle}
            onBuyPost={buyPostDialog.toggle}
            onReceipt={receiptDialog.toggle}
            onPurchase={purchaseDialog.toggle}
           
            onMenu={postMenuDialog.toggle} //??
            onShare={dialogShareOpenClick} //??
          />
        </Grid>
        <Hidden smDown>
          <Grid item md={4}>
            <Box position="sticky" top="4rem">
              {people.data && people.data.length > 0 && (
                <Box>
                  <Box mb={1} display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                    <Typography variant="h6">Suggestions For You</Typography>
                    <MUILink variant="caption" to={SUGESTED_PEOPLE} component={Link}>
                      See All
                    </MUILink>
                  </Box>
                  <RelationshipList items={people.data} onFollowClick={handleFollowPeople} />
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
      data: state.posts?.data,
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
      data: storyActions.getFollowingsStoriesWithMyself(state),
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
    createFollow: (api, userName) => dispatch(relationshipActions.createFollow(api, userName)),
    deleteFollow: (api, userName) => dispatch(relationshipActions.deleteFollow(api, userName)),

    blockUser: (api, userName) => dispatch(settingsActions.createBlackList(api, userName)),
    unblockUser: (api, userName) => dispatch(settingsActions.deleteBlackList(api, userName)),
    reportUser: (api, userName) => {
      console.log("Report user");
    },

    buyPost: (api, id) => dispatch(paymentActions.buyPost(api, id)),

    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: (api, opts) => dispatch(storyActions.resetStory(api, opts)),
    resetFollowingStories: () => dispatch(storyActions.resetFollowingStories()),
    getFollowingStories: (api, opts) => dispatch(storyActions.getFollowingStories(api, opts)),

    getHotStreamers: (api) => dispatch(streamActions.getHotStreamers(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
