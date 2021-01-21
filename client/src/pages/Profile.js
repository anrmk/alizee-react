import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import {
  Box,
  Container,
  DialogActions,
  Grid,
  Card,
  Typography,
  ButtonGroup,
  Button,
  Divider,
  CardContent,
  CardActions,
} from "@material-ui/core/";

import ApiContext from "../context/ApiContext";
import { SocialControl } from "../components/Social";
import Cover from "../domain/Cover";
import ProfileContent from "../domain/ProfileContent";

import * as postActions from "../store/actions/post";
import * as relationshipActions from "../store/actions/relationship";
import * as userActions from "../store/actions/user";
import * as settingsActions from "../store/actions/settings";

import {
  HOME_ROUTE,
  SETTINGS_ROUTE,
  POST_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
  CHAT_ROUTE,
  FOLLOWERS_ROUTE,
  FOLLOWINGS_ROUTE,
} from "../constants/routes";

import useDialog from "../hooks/useDialog";

const useStyles = {
  dialogBox: {
    display: "block",
  },
  dialogImage: {
    width: "100%",
  },
};

function Profile(props) {
  const initPostsSettings = {
    index: 0,
    tagged: false,
  };

  const { username } = useParams();
  const { url } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const classes = useStyles;
  const [postSettings, setPostSettings] = useState(initPostsSettings);
  const [coverData, setCoverData] = useState({});

  const { me, user, post, media } = props;
  const { fetchUser, resetUser } = props;
  const { fetchPosts, resetPosts, getFavoritePosts } = props;

  const { createFollow, deleteFollow } = props;

  const { updateCover } = props;

  const handleCoverEdit = (data) => {
    setCoverData(data);
    dialog.toggleDialog(true);
  };

  const handleCoverSave = async () => {
      dialog.toggleDialog(false);
      await updateCover(apiClient, [coverData.file]);
      setCoverData({ coverUrl: user.coverUrl });
  };

  const handleCoverClose = () => {
    setCoverData({ coverUrl: user.coverUrl });
    dialog.toggleDialog(false);
  };

  const dialog = useDialog({
    title: "Edit Cover",
    content: (
      <Box style={classes.dialogBox}>
        <img style={classes.dialogImage} src={coverData.coverUrl} alt={coverData.file?.name} />
      </Box>
    ),
    actionsComponent: (
      <DialogActions>
        <Button onClick={handleCoverSave}>Save</Button>
        <Button onClick={handleCoverClose}>Close</Button>
      </DialogActions>
    ),
    dialogProps: { fullWidth: true },
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

  useEffect(() => {
    if (user.coverUrl) {
      setCoverData({ coverUrl: user.coverUrl });
    }
  }, [user]);

  if (url.includes(SETTINGS_ROUTE)) {
    return <Redirect to={SETTINGS_EDIT_PROFILE_ROUTE} />;
  }

  if (user.errorMessage) {
    return <Redirect exact to={HOME_ROUTE} />;
  }

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

  const handleItemClick = (id) => {
    history.push(`${POST_ROUTE}/${id}`);
  };

  const handleTabChange = (index) => {
    setPostSettings({
      index: index,
      tagged: index === 1 || false,
    });
  };

  const handlePeopleFollow = (id) => {
    user.isFollow ? deleteFollow(apiClient, id) : createFollow(apiClient, id);
  };

  const handleMessageClick = (userName) => {
    history.push(CHAT_ROUTE(userName));
  };

  const handleGiftSend = (userName) => {};

  const handleFollowingClick = () => {
    history.push(FOLLOWINGS_ROUTE(user.userName));
  };

  const handleFollowersClick = () => {
    history.push(FOLLOWERS_ROUTE(user.userName));
  };

  return (
    <Container>
      <Cover
        user={user}
        isOwner={username === me.userName}
        disabled={media.isFetching}
        onPostCreate={() => {}}
        onFollowClick={() => handlePeopleFollow(user.id)}
        onEditCover={handleCoverEdit}
        onMessageClick={() => handleMessageClick(user.userName)}
        onSendGiftClick={() => handleGiftSend(user.userName)}
      />

      <Grid container spacing={3}>
        <Grid item sm={12} md={4}>
          <Card>
            <CardActions>
              <ButtonGroup disableElevation variant="text" fullWidth>
                <Button disabled={!user.followingsCount} onClick={handleFollowingClick}>
                  {user.followingsCount} following
                </Button>
                <Button disabled={!user.followersCount} onClick={handleFollowersClick}>
                  {user.followersCount} followers
                </Button>
              </ButtonGroup>
            </CardActions>
            <Divider />
            <CardContent>
              <Typography variant="h6">Bio</Typography>
              <Typography variant="body2">{user.bio}</Typography>
            </CardContent>
            {user.sites && (
              <CardActions>
                <SocialControl urls={user.sites} />
              </CardActions>
            )}
          </Card>
        </Grid>
        <Grid item sm={12} md={8}>
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

    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    resetPosts: () => dispatch(postActions.resetPosts()),

    getFavoritePosts: (api, opts) => dispatch(postActions.getFavoritePosts(api, opts)),

    createFollow: (api, userId) => dispatch(relationshipActions.createFollow(api, userId)),
    deleteFollow: (api, userId) => dispatch(relationshipActions.deleteFollow(api, userId)),

    updateCover: (api, coverUrl) => dispatch(settingsActions.updateCover(api, coverUrl)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
