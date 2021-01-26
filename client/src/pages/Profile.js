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
  Link,
  Divider,
  CardContent,
  CardActions,
  Hidden,
  Stepper,
  Step,
  StepLabel,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core/";

import ApiContext from "../context/ApiContext";
import { SocialControl } from "../components/Social";
import { PostSprout } from "../domain/PostsList";
import Cover from "../domain/Cover";
import ProfileContent from "../domain/ProfileContent";

import * as postActions from "../store/actions/post";
import * as storyActions from "../store/actions/story";
import * as moodActions from "../store/actions/mood";
import * as relationshipActions from "../store/actions/relationship";
import * as userActions from "../store/actions/user";
import * as accountActions from "../store/actions/account";
import * as settingsActions from "../store/actions/settings";

import {
  HOME_ROUTE,
  SETTINGS_ROUTE,
  POST_ID_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
  CHAT_ROUTE,
  FOLLOWERS_ROUTE,
  FOLLOWINGS_ROUTE,
  FAVORITES_USERNAME_ROUTE,
} from "../constants/routes";

import useDialog from "../hooks/useDialog";
import useSprout from "../hooks/useSprout";

function Profile(props) {
  const initPostsSettings = {
    index: 0,
    tagged: false,
  };

  const { me, user, post, media } = props;
  const { fetchUser, resetUser } = props;
  const { fetchPosts, resetPosts, getFavoritePosts } = props;
  const { createFollow, deleteFollow, createFavorites, deleteFavorites } = props;
  const { createPost, createStory, createMood, updateCover } = props;

  const { username } = useParams();
  const { url } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const [postSettings, setPostSettings] = useState(initPostsSettings);
  const [coverData, setCoverData] = useState({});

  const { onSproutSubmit } = useSprout({ createStory, createPost, createMood });

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
      <Box display="block">
        <img src={coverData.coverUrl} alt={coverData.file?.name} width="100%" />
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
    history.push(POST_ID_ROUTE(id));
  };

  const handleTabChange = (index) => {
    setPostSettings({
      index: index,
      tagged: index === 1 || false,
    });
  };

  const handlePeopleFollow = (userName) => {
    user.isFollow ? deleteFollow(apiClient, userName) : createFollow(apiClient, userName);
  };

  const handleFavorite = (userName) => {
    user.isFavorite ? deleteFavorites(apiClient, userName) : createFavorites(apiClient, userName);
  };

  const handleFavorites = () => {
    history.push(FAVORITES_USERNAME_ROUTE(user.userName));
  }

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
        isFavorite={user.isFavorite}
        disabled={media.isFetching}
        onFavoriteClick={() => handleFavorite(user.userName)}
        onFollowClick={() => handlePeopleFollow(user.userName)}
        onEditCover={handleCoverEdit}
        onMessageClick={() => handleMessageClick(user.userName)}
        onSendGiftClick={() => handleGiftSend(user.userName)}
      />

      <Grid container spacing={3}>
        <Grid item sm={12} md={4}>
          {username === me.userName && (
            <Hidden smDown>
              <PostSprout user={me} onSubmit={onSproutSubmit} />
            </Hidden>
          )}

          <BottomNavigation showLabels >
            <BottomNavigationAction label="Followers" disabled={!user.followersCount} onClick={() => handleFollowersClick()} icon={<Typography>{user?.followersCount || "0"}</Typography>} />
            <BottomNavigationAction label="Following" disabled={!user.followingsCount} onClick={() => handleFollowingClick()} icon={<Typography>{user?.followingsCount || "0"}</Typography>}  />
            <BottomNavigationAction label="Favorites" disabled={!user.favoritesCount} onClick={() => handleFavorites()} icon={<Typography>{user?.favoritesCount || "0"}</Typography>}  />
          </BottomNavigation>

          <Box>
            <Typography variant="h6">Bio</Typography>
            <Typography variant="body2">{user.bio}</Typography>
          </Box>

          {user.sites && (<SocialControl urls={user.sites} />)}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
