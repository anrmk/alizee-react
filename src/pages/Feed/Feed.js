import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Grid, Hidden } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

import { PostsList } from "../../domain/PostsList";
// import { HotStreamersItemList } from "./Stream";

import * as actionRelationship from "../../store/actions/relationship";

import * as postActions from "../../store/actions/post";
import * as storyActions from "../../store/actions/story";
// import * as streamActions from "../../store/actions/stream";
import * as paymentActions from "../../store/actions/payment";
import useWindowScrollPosition from "../../hooks/useWindowScrollPosition";

import PreviewStoriesList from "./StoriesLists";
import Nav from "./Nav";

import ApiContext from "../../context/ApiContext";

import { POST_ID_ROUTE } from "../../constants/routes";

import useShareDialog, {
  SHARE_DIALOG_POST_TYPE,
} from "../../hooks/useShareDialog";
import {
  useLikeAction,
  useFavoriteAction,
  useStoryDialog,
  useMenuDialog,
  useCommentAction,
} from "../../hooks/post";
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

  const { userInfo, width } = props;
  const { people, getPeople, resetPeople } = props;
  const { posts, getPosts, resetPosts } = props;
  const { story, getStories } = props;
  const { buyPost, getReceipt, getPurchases } = props;

  const history = useHistory();
  const likeAction = useLikeAction();
  const favoriteAction = useFavoriteAction();
  const sendTipDialog = useSendTipDialog();
  const buyPostDialog = usePaymentDialog({
    isFetching: posts.isFetching,
    onPayment: buyPost,
  });
  const receiptDialog = useReceiptDialog({
    isFetching: posts.isFetching,
    onReceipt: getReceipt,
  });
  const purchaseDialog = usePurchaseDialog({
    isFetching: posts.isFetching,
    onPurchases: getPurchases,
  });
  const createStoryDialog = useStoryDialog();
  const postMenuDialog = useMenuDialog();
  const fullScreen = useFullScreen("root");
  const { handleCommentSendClick } = useCommentAction();
  const lightboxModal = useLightboxModal();
  const shareDialog = useShareDialog({ type: SHARE_DIALOG_POST_TYPE });
  const scroll = useWindowScrollPosition(
    posts.data,
    posts.scrollPosition,
    postActions.setScrollPosition
  );

  useEffect(() => {
    scroll();
  }, []);

  useEffect(() => {
    if (!posts.data.length) {
      getPosts(apiClient);
    }

    return () => {
      resetPeople();
    };
  }, []);

  useEffect(() => {
    if (width !== "xs" && width !== "sm" && !people?.data?.length) {
      getPeople(apiClient);
    }
  }, [width]);

  useEffect(() => {
    if (!story.data.length) {
      getStories(apiClient);
    }
  }, []);

  const handleFetchMore = (isLoading) => {
    if (!isLoading) {
      getPosts(apiClient);
    }
  };

  const handleRefresh = (isLoading) => {
    if (!isLoading) {
      resetPosts();
      getPosts(apiClient);
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
  };

  const handleOpenPostClick = (id) => {
    history.push(POST_ID_ROUTE(id));
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8} className={classes.mainBox}>
        <Hidden smDown>
          <Nav />
        </Hidden>
        <PreviewStoriesList
          loading={!story.isFetching}
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
          onOpenPostClick={handleOpenPostClick}
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
              onRefresh={handlePeopleRefreshClick}
            />
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
      scrollPosition: state.followingPosts.scrollPosition,
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
    getPosts: (api) => dispatch(postActions.getFollowingPosts(api)),
    getPurchases: (api, id, callback) =>
      dispatch(postActions.getPurchases(api, id, callback)),
    getReceipt: (api, id, callback) =>
      dispatch(postActions.getReceipt(api, id, callback)),
    resetPosts: () => dispatch(postActions.resetFollowingPosts()),
    getPeople: (api) => dispatch(actionRelationship.getRefreshRecommended(api)),
    resetPeople: () => dispatch(actionRelationship.resetRecommended()),
    buyPost: (api, id) => dispatch(paymentActions.buyPost(api, id)),

    getStories: (api, opts) =>
      dispatch(storyActions.getFollowingStories(api, opts)),

    // getHotStreamers: (api) => dispatch(streamActions.getHotStreamers(api)),
  };
}

export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(Feed));
