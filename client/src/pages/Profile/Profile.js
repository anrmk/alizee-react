import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import { Box, Container, Grid, Hidden } from "@material-ui/core/";

import ApiContext from "../../context/ApiContext";
import { SocialControl } from "../../components/Social";
import ProfileHeader from "../../domain/ProfileHeader";
import ProfileContent from "../../domain/ProfileContent";

import * as postActions from "../../store/actions/post";
import * as relationshipActions from "../../store/actions/relationship";
import * as userActions from "../../store/actions/user";
import * as accountActions from "../../store/actions/account";
import * as settingsActions from "../../store/actions/settings";

import {
  SETTINGS_ROUTE,
  POST_ID_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
  NOT_FOUND_ROUTE,
} from "../../constants/routes";

import useDialog from "../../hooks/useDialog";
import useShareDialog, { SHARE_DIALOG_PROFILE_TYPE } from "../../hooks/useShareDialog";
import { useMoodDialog } from "../../hooks/post";
import { useSendTipDialog } from "../../hooks/payment";
import useFollowDialog from "../../hooks/payment/useFollowDialog";
import dialogs, { PROFILE_EDIT_COVER } from "../../constants/dialogs";
import { ProfileUserInfo, ProfileUserInfoMobile } from "../../domain/ProfileUserInfo";

import useStyles from "./style";

function Profile(props) {
  const initPostsSettings = {
    index: 0,
    tagged: false,
  };

  const classes = useStyles();
  const { username } = useParams();
  const { url } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const [postSettings, setPostSettings] = useState(initPostsSettings);

  const { me, user, post, media, settings } = props;
  const { fetchUser, resetUser } = props;
  const { fetchPosts, resetPosts, getFavoritePosts } = props;
  const { createFollow, deleteFollow, createFavorites, deleteFavorites } = props;
  const { updateCover, updateAvatar } = props;

  const dialog = useDialog();

  const { dialogShareOpenClick } = useShareDialog({
    userName: username,
    type: SHARE_DIALOG_PROFILE_TYPE,
  });

  const followDialog = useFollowDialog();
  const sendTipDialog = useSendTipDialog();
  const createMoodDialog = useMoodDialog();

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
      URL.revokeObjectURL(user?.data?.avatarUrl);
      URL.revokeObjectURL(user?.data?.coverUrl);
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
    return <Redirect exact to={NOT_FOUND_ROUTE} />;
  }

  const handleCoverSave = async ({ file, coverUrl }) => {
    dialog.toggle({ open: false });
    user.data.coverUrl = coverUrl;
    !settings.isFetching && await updateCover(apiClient, { file });
  };

  const handleCoverEditDialog = (file) => {
    const coverUrl = URL.createObjectURL(file);

    dialog.toggle(
      dialogs[PROFILE_EDIT_COVER](
        {
          open: true,
          onMainClick: handleCoverSave,
          tempData: { file, coverUrl }
        },
        {
          src: coverUrl,
          alt: file?.name
        }
      )
    );
  };

  const handleFetchPosts = async () => {
    if (post.isFetching) {
      return;
    }

    if (postSettings.index === 2) {
      getFavoritePosts(apiClient);
    } else {
      fetchPosts(apiClient, {
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
    user.data.isFollow ? deleteFollow(apiClient, userName) : createFollow(apiClient, userName);
  };

  const handleFavoriteClick = (userName) => {
    user.data.isFavorite ? deleteFavorites(apiClient, userName) : createFavorites(apiClient, userName);
  };

  const handleItemClick = (id) => {
    history.push(POST_ID_ROUTE(id));
  };

  const handleGiftSendClick = (userName) => { };

  const handleAvatarImageChange = (file) => {
    !user.isFetching && updateAvatar(apiClient, { file });

    const fileUrl = URL.createObjectURL(file);
    user.data.avatarUrl = fileUrl;
  };

  const handleDeleteAvatarImageClick = () => {
    !user.isFetching && updateAvatar(apiClient, { file: null, url: null });

    user.data.avatarUrl = null;
  };

  const handleDeleteCoverImageClick = () => {
    !settings.isFetching && updateCover(apiClient, { file: null, url: null });

    user.data.coverUrl = null;
  };

  return (
    <Container className={classes.root} fixed>
      <ProfileHeader
        user={user.data}
        isOwner={username === me.userName}
        disabled={media.isFetching}
        onFavoriteClick={() => handleFavoriteClick(user.data.userName)}
        onFollowClick={() => handlePeopleFollowClick(user.data.userName)}
        onSendGiftClick={() => handleGiftSendClick(user.data.userName)}
        onShareClick={() => dialogShareOpenClick({ userName: user.data.userName })}
        onCoverUrlChange={handleCoverEditDialog}
        onDeleteCoverImageClick={handleDeleteCoverImageClick} />
      <Hidden mdUp>
        <ProfileUserInfoMobile
          user={user.data}
          isOwner={username === me.userName}
          isFollow={user.data.isFollow}
          subscriptionPrice={user.data.subscriptionPrice}
          onSubscribeClick={followDialog.toggle}
          onSendTipClick={sendTipDialog.toggle} />
      </Hidden>

      <Grid container>
        <Grid item xs={12} md={8}>
          <ProfileContent
            isOwner={username === me.userName}
            tabIndex={postSettings.index}
            items={post.data}
            hasMore={post.hasMore}
            disabled={post.isFetching}
            onFetchMore={handleFetchPosts}
            onItemClick={handleItemClick}
            onTabChange={handleTabChange} />
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} md={4}>
            <Box position="sticky" top="4rem" paddingLeft="8px">
              <ProfileUserInfo
                className={classes.userInfo}
                user={user.data}
                isOwner={username === me.userName}
                isFollow={user.data.isFollow}
                subscriptionPrice={user.data.subscriptionPrice}
                onSubscribeClick={followDialog.toggle}
                onSendTipClick={sendTipDialog.toggle}
                onMoodUpdateClick={createMoodDialog.toggle}
                onDeleteAvatarImageClick={handleDeleteAvatarImageClick}
                onAvatarUrlChange={handleAvatarImageChange} />
              {user.data.sites && <SocialControl urls={user.data.sites} />}
            </Box>
          </Grid>
        </Hidden>
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
    user: { 
      data: state.user?.data,
      isFetching: state.user.isFetching,
      errorMessage: state.user?.errorMessage
    },
    post: {
      isFetching: state.posts.isFetching || false,
      data: postActions.getGridGalleryPosts(state),
      errorMessage: state.posts.errorMessage,
      hasMore: state.posts.hasMore,
    },
    media: {
      isFetching: state.media.isFetching,
    },
    settings: {
      isFetching: state.settings.isFetching
    }
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

    updateCover: (api, opts) => dispatch(settingsActions.updateCover(api, opts)),
    updateAvatar: (api, opts) => dispatch(userActions.updateAvatar(api, opts))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
