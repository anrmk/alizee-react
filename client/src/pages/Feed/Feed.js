import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Box, Grid, Hidden } from "@material-ui/core";

import { PostsList } from "../../domain/PostsList";
// import { HotStreamersItemList } from "../../domain/Stream";

import * as actionRelationship from "../../store/actions/relationship";

import * as postActions from "../../store/actions/post";
import * as storyActions from "../../store/actions/story";
// import * as streamActions from "../../store/actions/stream";
import * as paymentActions from "../../store/actions/payment";

import { PreviewStoriesList } from "../../domain/StoriesLists";
import Nav from "./Nav";

import ApiContext from "../../context/ApiContext";
import { STORIES_LENGTH } from "../../constants/feed";

import useShareDialog, { SHARE_DIALOG_POST_TYPE } from "../../hooks/useShareDialog";
import { useLikeAction, useFavoriteAction, useStoryDialog, useMenuDialog, useCommentAction } from "../../hooks/post";
import {
  useSendTipDialog,
  usePaymentDialog,
  usePurchaseDialog,
  useReceiptDialog,
} from "../../hooks/payment";
import useFullScreen from "../../hooks/useFullScreen";
import useLightboxModal from "../../hooks/useLightboxModal";

import useStyles from "./styles";
import SuggestionPeopleList from "../../components/SuggestionPeopleList";

function Feed(props) {
  const classes = useStyles();
  const apiClient = useContext(ApiContext);

  const { userInfo } = props;
  const { people, getPeople, resetPeople } = props;
  const { posts, getPosts, resetPosts } = props;
  const { story, getFollowingStories, resetFollowingStories } = props;
  // const { hotStreamers, getHotStreamers } = props;

  const likeAction = useLikeAction();
  const favoriteAction = useFavoriteAction();
  const sendTipDialog = useSendTipDialog();
  const buyPostDialog = usePaymentDialog({ isFetching: posts.isFetching, onPayment: props.buyPost });
  const receiptDialog = useReceiptDialog({ isFetching: posts.isFetching, onReceipt: props.getReceipt });
  const purchaseDialog = usePurchaseDialog({ isFetching: posts.isFetching, onPurchases: props.getPurchases });
  const createStoryDialog = useStoryDialog();
  const postMenuDialog = useMenuDialog();
  const fullScreen = useFullScreen("root");
  const { handleCommentSendClick } = useCommentAction();
  const lightboxModal = useLightboxModal();
  const shareDialog = useShareDialog({ type: SHARE_DIALOG_POST_TYPE });

  useEffect(() => {
    if (!posts.data.length) {
      getPosts(apiClient, { userId: userInfo.id });
    }
    getPeople(apiClient);
    getFollowingStories(apiClient, { length: STORIES_LENGTH });

    return () => {
      resetFollowingStories();
      resetPeople();
    };
  }, []);

  const handleFetchMore = (isLoading) => {
    if (!isLoading) {
      getPosts(apiClient, { id: userInfo.id });
    }
  };

  const handleRefresh = (isLoading) => {
    if (!isLoading) {
      resetPosts();
      getPosts(apiClient, { id: userInfo.id });
    }
  };

  const handleJoinStream = () => {
    console.log("handleJoinStream");
  };

  const handleStoryClick = () => {
    fullScreen.toggle(true);
  };

  const handlePeopleRefreshClick = () => {
    getPeople(apiClient);
  }

  return (
    <Grid container>
      <Grid item xs={12} md={8} className={classes.mainBox}>
        <Nav />
        
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
          onRefresh={handleRefresh}
          onFetchMore={handleFetchMore}
          onLike={likeAction.toggle}
          onFavorite={favoriteAction.toggle}
          onSendTip={sendTipDialog.toggle}
          onBuyPost={buyPostDialog.toggle}
          onReceipt={receiptDialog.toggle}
          onPurchase={purchaseDialog.toggle}
          onShare={shareDialog.toggle}
          onMenu={postMenuDialog.toggle}
          onCommentSend={handleCommentSendClick}
          onFullScreen={lightboxModal.toggle}
        />
      </Grid>

      <Hidden smDown>
        <Grid item md={4}>
          <Box className={classes.suggestionList}>
            <SuggestionPeopleList
              withTopbar
              items={people.data}
              limit={5}
              isLoading={people.isFetching}
              onRefresh={handlePeopleRefreshClick} />
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
      isFetching: state.followingPosts.isFetching,
      data: state.followingPosts.data,
      errorMessage: state.followingPosts.errorMessage,
      hasMore: state.followingPosts.hasMore,
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
    resetPosts: () => dispatch(postActions.resetFollowingPosts()),

    getPeople: (api) => dispatch(actionRelationship.getSuggestionPeople(api, 5)),
    resetPeople: () => dispatch(actionRelationship.resetSuggestionPeople()),
    buyPost: (api, id) => dispatch(paymentActions.buyPost(api, id)),

    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: (api, opts) => dispatch(storyActions.resetStory(api, opts)),
    resetFollowingStories: () => dispatch(storyActions.resetFollowingStories()),
    getFollowingStories: (api, opts) => dispatch(storyActions.getFollowingStories(api, opts)),

    // getHotStreamers: (api) => dispatch(streamActions.getHotStreamers(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
