import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Hidden, Link as MUILink } from "@material-ui/core";

import { PostsList } from "../../domain/PostsList";
// import { HotStreamersItemList } from "../../domain/Stream";

import * as actionSuggestion from "../../store/actions/suggestion";

import * as postActions from "../../store/actions/post";
import * as storyActions from "../../store/actions/story";
// import * as streamActions from "../../store/actions/stream";
import * as paymentActions from "../../store/actions/payment";

import { PreviewStoriesList } from "../../domain/StoriesLists";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

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
  // useFollowDialog,
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
  const { story, getFollowingStories, resetFollowingStories } = props;
  // const { hotStreamers, getHotStreamers } = props;

  const likeAction = useLikeAction();
  const favoriteAction = useFavoriteAction();
  // const followDialog = useFollowDialog();
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
    getPeople(apiClient);

    return () => {
      resetPosts();
      resetFollowingStories();
    };
  }, []);

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
    <Grid container >
      <Grid item xs={12} md={8} className={classes.mainBox}>
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
        <Grid item md={4} >
          <Box className={classes.suggestionList}>
            {people.data && people.data.length > 0 && (
              <Box mb={1}>
                <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">Suggestions</Typography>
                  <MUILink variant="caption" to={SUGESTED_PEOPLE} component={Link}>
                    See All
                  </MUILink>
                </Box>
                {people.data.map(item => (
                  <ProfileCard {...item} key={`suggestion_${item.userName}`} />
                ))}
              </Box>
            )}

            {/* {hotStreamers.data && hotStreamers.data.length > 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Hot Streamers
                </Typography>
                <HotStreamersItemList items={hotStreamers.data} onJoinStream={handleJoinStream} />
              </Box>
            )} */}
          </Box>
        </Grid>
      </Hidden>
    </Grid>
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
      isFetching: state.suggestionPeople.isFetching,
      data: state.suggestionPeople.data,
      errorMessage: state.suggestionPeople.errorMessage,
    },

    story: {
      isFetching: state.story.isFetching,
      data: state.story.data,
      errorMessage: state.story.errorMessage,
      hasMore: state.story.hasMore,
    },

    // hotStreamers: {
    //   isFetching: state.stream.isFetching,
    //   data: state.stream?.hotStreamers,
    //   errorMessage: state.stream.errorMessage,
    // },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (api, opts) => dispatch(postActions.getFollowingPosts(api, opts)),
    getPurchases: (api, id, callback) => dispatch(postActions.getPurchases(api, id, callback)),
    getReceipt: (api, id, callback) => dispatch(postActions.getReceipt(api, id, callback)),
    resetPosts: () => dispatch(postActions.resetPosts()),

    getPeople: (api) => dispatch(actionSuggestion.getPeople(api, 5)),
    buyPost: (api, id) => dispatch(paymentActions.buyPost(api, id)),

    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: (api, opts) => dispatch(storyActions.resetStory(api, opts)),
    resetFollowingStories: () => dispatch(storyActions.resetFollowingStories()),
    getFollowingStories: (api, opts) => dispatch(storyActions.getFollowingStories(api, opts)),

    // getHotStreamers: (api) => dispatch(streamActions.getHotStreamers(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
