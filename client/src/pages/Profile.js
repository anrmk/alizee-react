import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import {
  Container,
  Grid,
  Box,
  Card,
  Typography,
  ButtonGroup,
  Button,
  Divider,
  CardContent,
  CardHeader,
  CardActions,
} from "@material-ui/core/";

import ApiContext from "../context/ApiContext";
import { SocialControl } from "../components/Social";
import ProfileHeader from "../domain/ProfileHeader";
import ProfileContent from "../domain/ProfileContent";

import * as postActions from "../store/actions/post";
import * as relationshipActions from "../store/actions/relationship";
import * as userActions from "../store/actions/user";

import {
  HOME_ROUTE,
  SETTINGS_ROUTE,
  POST_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
  CHAT_ROUTE,
  FOLLOWERS_ROUTE,
  FOLLOWINGS_ROUTE,
} from "../constants/routes";

function Profile(props) {
  const initPostsSettings = {
    index: 0,
    tagged: false,
  };

  const { username } = useParams();
  const { url } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const [postSettings, setPostSettings] = useState(initPostsSettings);

  const { me, user, post } = props;
  const { fetchUser, resetUser } = props;
  const { fetchPosts, resetPosts, getFavoritePosts } = props;

  const { createFollow, deleteFollow } = props;

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

  const handleCoverEdit = (id) => {
    console.log("onEditCover", id);
  };

  const handlePeopleFollow = (id) => {
    user.isFollow ? deleteFollow(apiClient, id) : createFollow(apiClient, id);
  };

  const handleMessageClick = (userName) => {
    history.push(CHAT_ROUTE(userName));
  };

  const handleGiftSend = (userName) => {};

  const handleFollowingClick = (userName) => {
    history.push(FOLLOWINGS_ROUTE(userName));
  };

  const handleFollowersClick = (userName) => {
    history.push(FOLLOWERS_ROUTE(userName));
  };

  return (
    <Container>
      <Box>
        <ProfileHeader
          isOwner={username === me.username}
          isOnline={!user.offlineDate}
          isFollow={user.isFollow}
          avatarUrl={user.avatarUrl}
          imageUrl={user.coverUrl}
          userName={user.userName}
          fullName={user.name}
          membership={user.membership}
          mood={user.mood}
          onPostCreate={() => {}}
          onFollowClick={() => handlePeopleFollow(user.id)}
          onEditCover={handleCoverEdit}
          onMessageClick={() => handleMessageClick(user.username)}
          onSendGiftClick={() => handleGiftSend(user.username)}
        />

        <Grid container spacing={3}>
          <Grid item sm={12} md={3}>
            <Card>
              <CardActions>
                <ButtonGroup disableElevation variant="text" fullWidth>
                  <Button
                    disabled={!user.followingsCount}
                    onClick={() => handleFollowingClick(user.username)}
                  >{`${user.followingsCount} following`}</Button>
                  <Button
                    disabled={!user.followersCount}
                    onClick={() => handleFollowersClick(user.username)}
                  >{`${user.followersCount} followers`}</Button>
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
          <Grid item sm={12} md={9}>
            <ProfileContent
              isOwner={username === me.username}
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
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      id: state.signIn?.userInfo?.id,
      username: state.signIn?.userInfo?.userName,
    },
    user: state.user?.data,
    post: {
      count: state.posts.count,
      isFetching: state.posts.isFetching || false,
      data: postActions.getGridGalleryPosts(state),
      errorMessage: state.posts.errorMessage,
      hasMore: state.posts.hasMore,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    resetUser: () => dispatch(userActions.resetUser()),

    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    resetPosts: () => dispatch(postActions.resetPosts()),

    getFavoritePosts: (api, opts) => dispatch(postActions.getFavoritePosts(api, opts)),

    createFollow: (api, userId) => dispatch(relationshipActions.createFollow(api, userId)),
    deleteFollow: (api, userId) => dispatch(relationshipActions.deleteFollow(api, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
