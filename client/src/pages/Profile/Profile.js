import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import { Box, Grid, Hidden, Typography } from "@material-ui/core/";

import BlockIcon from "@material-ui/icons/Block";

import ApiContext from "../../context/ApiContext";
import ProfileHeader from "../../domain/ProfileHeader";
import ProfileContent from "../../domain/ProfileContent";

import * as profilePostsActions from "../../store/actions/post";
import * as relationshipActions from "../../store/actions/relationship";
import * as userActions from "../../store/actions/user";
import * as settingsActions from "../../store/actions/settings";

import { SETTINGS_ROUTE, POST_ID_ROUTE, SETTINGS_EDIT_PROFILE_ROUTE, NOT_FOUND_ROUTE } from "../../constants/routes";

import useConfirmationDialog from "../../hooks/useConfirmationDialog";
import useDialog from "../../hooks/useDialog";
import { useMenuDialog, useMoodDialog } from "../../hooks/post";
import { useSendTipDialog } from "../../hooks/payment";
import useFollowDialog from "../../hooks/payment/useFollowDialog";
import dialogs, { PROFILE_EDIT_COVER } from "../../constants/dialogs";
import { ProfileUserInfo, ProfileUserInfoMobile } from "../../domain/ProfileUserInfo";
import { PROFILE_TYPE } from "../../components/Post/Menu";
import { RedirectContent } from "../../domain/ConfirmationDialog.js";

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
  const { createFollow, deleteFollow } = props;
  const { updateCover, updateAvatar } = props;

  const dialog = useDialog();

  const confirmationDialog = useConfirmationDialog();
  const followDialog = useFollowDialog();
  const sendTipDialog = useSendTipDialog();
  const createMoodDialog = useMoodDialog();
  const postMenuDialog = useMenuDialog({
    isDelete: false,
    isReport: false,
    isChatShare: true,
    isFavorite: true,
    type: PROFILE_TYPE,
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
      URL.revokeObjectURL(user?.data?.avatarUrl);
      URL.revokeObjectURL(user?.data?.coverUrl);
    };
  }, [username]);

  useEffect(() => {
    if (username) {
      resetPosts();
      handleFetchPosts();
    }
  }, [postSettings, user.data?.isFollow]);

  if (url.includes(SETTINGS_ROUTE)) {
    return <Redirect to={SETTINGS_EDIT_PROFILE_ROUTE} />;
  }

  if (user.errorMessage) {
    return <Redirect exact to={NOT_FOUND_ROUTE} />;
  }

  const handleCoverSave = async ({ file, coverUrl }) => {
    dialog.toggle({ open: false });
    user.data.coverUrl = coverUrl;
    !settings.isFetching && (await updateCover(apiClient, { file }));
  };

  const handleCoverEditDialog = (file) => {
    const coverUrl = URL.createObjectURL(file);

    dialog.toggle(
      dialogs[PROFILE_EDIT_COVER](
        {
          open: true,
          onMainClick: handleCoverSave,
          state: { file, coverUrl },
        },
        {
          src: coverUrl,
          alt: file?.name,
        }
      )
    );
  };

  async function handleFetchPosts() {
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
  }

  const handleTabChange = (index) => {
    setPostSettings({
      index: index,
      tagged: index === 1 || false,
    });
  };

  const handlePeopleFollowClick = async (userName) => {
    user.data.isFollow
      ? await deleteFollow(apiClient, userName)
      : await createFollow(apiClient, userName, user.data?.isPrivate);

    resetPosts();
    handleFetchPosts();
  };

  const handleItemClick = (id) => {
    history.push(POST_ID_ROUTE(id));
  };

  const handleGiftSendClick = (userName) => {};

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

  const handleMoodUpdateClick = () => {
    createMoodDialog.toggle && createMoodDialog.toggle({ ...user.data, defaultValue: user.data.mood });
  };

  const handleGoToSocialClick = (link) => {
    confirmationDialog.toggle(
      {
        mainBtnText: "Link",
        title: "Leaving TheMembers",
        onMainClick: () => window.open(link, "_blank"),
      },
      {
        contentText: <RedirectContent link={link} />,
      }
    );
  };

  // if (user.data.isBlocked) {
  //   return (
  //     <Box width="100%" textAlign="center">
  //       <BlockIcon fontSize="large" />
  //       <Typography>You or user blocked you.</Typography>
  //     </Box>
  //   );
  // }

  return (
    <>
      <ProfileHeader
        user={user.data}
        isOwner={username === me.userName}
        disabled={media.isFetching}
        onFollowClick={() => handlePeopleFollowClick(user.data.userName)}
        onSendGiftClick={() => handleGiftSendClick(user.data.userName)}
        onCoverUrlChange={handleCoverEditDialog}
        onDeleteCoverImageClick={handleDeleteCoverImageClick}
        onMenuClick={() =>
          postMenuDialog.toggle({
            userName: user.data.userName,
            isOwner: username === me.userName,
            isFavorite: user.data.isFavorite,
          })
        }
      />
      <Hidden mdUp>
        <ProfileUserInfoMobile
          user={user.data}
          isOwner={username === me.userName}
          isFollow={user.data?.isFollow}
          isVerified={user.data?.identityVerified}
          followStatus={user.data?.followStatus}
          subscriptionPrice={user.data?.subscriptionPrice}
          onSubscribeClick={followDialog.toggle}
          onSendTipClick={sendTipDialog.toggle}
          onMoodUpdateClick={handleMoodUpdateClick}
        />
      </Hidden>

      <Grid container>
        <Grid item xs={12} md={8}>
          <ProfileContent
            user={user.data}
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
        <Hidden smDown>
          <Grid item xs={12} md={4}>
            <Box position="sticky" top="24px" paddingLeft="8px">
              <ProfileUserInfo
                user={user.data}
                isOwner={username === me.userName}
                isFollow={user.data?.isFollow}
                isVerified={user.data?.identityVerified}
                followStatus={user.data?.followStatus}
                subscriptionPrice={user.data?.subscriptionPrice}
                onSubscribeClick={followDialog.toggle}
                onSendTipClick={sendTipDialog.toggle}
                onMoodUpdateClick={handleMoodUpdateClick}
                onDeleteAvatarImageClick={handleDeleteAvatarImageClick}
                onAvatarUrlChange={handleAvatarImageChange}
                sites={user.data.sites}
                onClick={handleGoToSocialClick}
              />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </>
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
      errorMessage: state.user?.errorMessage,
    },
    post: {
      isFetching: state.profilePosts.isFetching || false,
      data: profilePostsActions.getGridGalleryPosts(state),
      errorMessage: state.profilePosts.errorMessage,
      hasMore: state.profilePosts.hasMore,
    },
    media: {
      isFetching: state.media.isFetching,
    },
    settings: {
      isFetching: state.settings.isFetching,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, userName) => dispatch(userActions.getUser(api, userName)),
    resetUser: () => dispatch(userActions.resetUser()),

    fetchPosts: (api, opts) => dispatch(profilePostsActions.getPosts(api, opts)),
    resetPosts: () => dispatch(profilePostsActions.resetPosts()),

    getFavoritePosts: (api, opts) => dispatch(profilePostsActions.getFavoritePosts(api, opts)),

    createFollow: (api, userName, isPrivateAccount) =>
      dispatch(relationshipActions.createFollow(api, userName, isPrivateAccount)),
    deleteFollow: (api, userName) => dispatch(relationshipActions.deleteFollow(api, userName)),

    updateCover: (api, opts) => dispatch(settingsActions.updateCover(api, opts)),
    updateAvatar: (api, opts) => dispatch(settingsActions.updateAvatar(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
