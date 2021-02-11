import React, { useContext, useEffect, useState, useCallback } from "react";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import { Box, Container, Grid, Typography, Hidden } from "@material-ui/core/";

import ApiContext from "../../context/ApiContext";
import { SocialControl } from "../../components/Social";
import { PostSprout } from "../../domain/PostsList";
import Cover from "../../domain/Cover";
import ProfileContent from "../../domain/ProfileContent";

import * as postActions from "../../store/actions/post";
import * as storyActions from "../../store/actions/story";
import * as moodActions from "../../store/actions/mood";
import * as relationshipActions from "../../store/actions/relationship";
import * as userActions from "../../store/actions/user";
import * as accountActions from "../../store/actions/account";
import * as settingsActions from "../../store/actions/settings";
import * as paymentActions from "../../store/actions/payment";

import {
  HOME_ROUTE,
  SETTINGS_ROUTE,
  POST_ID_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
  CHAT_ROUTE,
} from "../../constants/routes";

import useDialog from "../../hooks/useDialog";
import usePostSproutDialog from "../../hooks/usePostSproutDialog";
import dialogs, { PROFILE_EDIT_COVER, SEND_TIP_DIALOG_TYPE } from "../../constants/dialogs";
import Navigation from "./Navigation";

function Profile(props) {
  const initPostsSettings = {
    index: 0,
    tagged: false,
  };

  const { me, user, post, media } = props;
  const { fetchUser, resetUser, sendTip } = props;
  const { fetchPosts, resetPosts, getFavoritePosts } = props;
  const { createFollow, deleteFollow, createFavorites, deleteFavorites } = props;
  const { createPost, createStory, createMood, updateCover } = props;

  const { username } = useParams();
  const { url } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const [postSettings, setPostSettings] = useState(initPostsSettings);

  const FORM_ID = "dialog-sendTip";
  const dialog = useDialog();

  const { dialogToggleSprout } = usePostSproutDialog({
    onCreatePost: createPost,
    onCreateStory: createStory,
    onCreateMood: createMood,
  });

  useEffect(() => {
    return () => {
      resetUser();
      resetPosts();
    };
  }, []);

  useEffect(() => {
    if (username) {
      fetchUser(apiClient, username);
      setPostSettings(initPostsSettings);
    }
    return () => {
      resetUser();
    };
  }, [username]);

  useEffect(() => {
    if (username) {
      resetPosts();
      handleFetchPosts();
    }
  }, [postSettings]);

  if (url.includes(SETTINGS_ROUTE)) {
    return <Redirect to={SETTINGS_EDIT_PROFILE_ROUTE} />;
  }

  if (user.errorMessage) {
    return <Redirect exact to={HOME_ROUTE} />;
  }

  const handleCoverSave = async (data) => {
    dialog.toggle({ open: false });
    await updateCover(apiClient, [data.file]);
  };

  const handleCoverEditDialog = (data) => {
    dialog.toggle(
      dialogs[PROFILE_EDIT_COVER](
        {
          open: true,
          onMainClick: handleCoverSave,
          tempData: data,
        },
        {
          src: data.coverUrl,
          alt: data.file?.name,
        }
      )
    );
  };

  const handleSendTipDialog = (data) => {
    dialog.toggle(
      dialogs[SEND_TIP_DIALOG_TYPE](
        {
          open: true,
          mainBtnProps: { type: "submit", form: FORM_ID },
          tempData: data,
        },
        {
          formId: FORM_ID,
          onSubmit: handleSendTipClick,
          user: data,
        }
      )
    );
  };

  const handleSendTipClick = (data) => {
    dialog.toggle({ open: false });
    sendTip(apiClient, data.user.userName, data.amount, data.message);
  };

  const handleFetchPosts = async () => {
    if (post.isFetching) {
      return;
    }

    if (postSettings.index === 2) {
      await getFavoritePosts(apiClient);
    } else {
      await fetchPosts(apiClient, {
        userName: username,
        tagged: postSettings.tagged,
      });
    }
  };

  const handleTabChange = (index) => {
    setPostSettings({
      index: index,
      tagged: index === 1 || false,
    });
  };

  const handlePeopleFollowClick = (userName) => {
    user.isFollow ? deleteFollow(apiClient, userName) : createFollow(apiClient, userName);
  };

  const handleFavoriteClick = (userName) => {
    user.isFavorite ? deleteFavorites(apiClient, userName) : createFavorites(apiClient, userName);
  };

  const handleItemClick = (id) => {
    history.push(POST_ID_ROUTE(id));
  };

  const handleMessageClick = (userName) => {
    history.push(CHAT_ROUTE(userName));
  };

  const handleGiftSendClick = (userName) => {};

  return (
    <Container>
      <Cover
        user={user}
        isOwner={username === me.userName}
        disabled={media.isFetching}
        onFavoriteClick={() => handleFavoriteClick(user.userName)}
        onFollowClick={() => handlePeopleFollowClick(user.userName)}
        onMessageClick={() => handleMessageClick(user.userName)}
        onSendGiftClick={() => handleGiftSendClick(user.userName)}
        onEditCover={handleCoverEditDialog}
        onSendTipClick={handleSendTipDialog}
      />

      <Hidden smUp>
        <Box>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="subtitle2" gutterBottom>
            {user.userName}
          </Typography>
        </Box>
      </Hidden>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {username === me.userName && (
            <Hidden smDown>
              <PostSprout userName={me.userName} onDialogToggle={dialogToggleSprout} />
            </Hidden>
          )}

          <Navigation
            userName={user.userName}
            followersCount={user?.followersCount}
            followingsCount={user?.followingsCount}
            favoritesCount={user?.favoritesCount}
          />

          <Box>
            <Typography variant="h6" gutterBottom>
              Bio
            </Typography>
            <Typography variant="body2" gutterBottom>
              {user.bio}
            </Typography>
          </Box>

          {user.sites && <SocialControl urls={user.sites} />}
        </Grid>

        <Grid item xs={12} md={8}>
          <ProfileContent
            isOwner={username === me.userName}
            tabIndex={postSettings.index}
            items={post.data}
            hasMore={post.hasMore}
            disabled={post.isFetching}
            onFetchMore={handleFetchPosts}
            onItemClick={handleItemClick}
            onTabChange={handleTabChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      id: state.signIn?.userInfo?.id,
      userName: state.signIn?.userInfo?.userName,
    },
    user: state.user?.data,
    post: {
      count: state.posts.count,
      isFetching: state.posts.isFetching || false,
      data: postActions.getGridGalleryPosts(state),
      errorMessage: state.posts.errorMessage,
      hasMore: state.posts.hasMore,
    },
    media: {
      isFetching: state.media.isFetching,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, userName) => dispatch(userActions.getUser(api, userName)),
    resetUser: () => dispatch(userActions.resetUser()),
    createFavorites: (api, userName) => dispatch(accountActions.createFavorites(api, userName)),
    deleteFavorites: (api, userName) => dispatch(accountActions.deleteFavorites(api, userName)),

    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    resetPosts: () => dispatch(postActions.resetPosts()),

    getFavoritePosts: (api, opts) => dispatch(postActions.getFavoritePosts(api, opts)),

    createFollow: (api, userName) => dispatch(relationshipActions.createFollow(api, userName)),
    deleteFollow: (api, userName) => dispatch(relationshipActions.deleteFollow(api, userName)),

    createPost: (api, post, media) => dispatch(postActions.createPost(api, post, media)),
    createStory: (api, story, media) => dispatch(storyActions.createStorySlide(api, story, media)),
    createMood: (api, data) => dispatch(moodActions.createMood(api, data)),
    updateCover: (api, coverUrl) => dispatch(settingsActions.updateCover(api, coverUrl)),
    sendTip: (api, userName, amount, message) => dispatch(paymentActions.sendTip(api, userName, amount, message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
