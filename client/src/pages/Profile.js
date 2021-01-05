import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Box, Typography, Button, Divider, makeStyles } from "@material-ui/core/";

import ApiContext from "../context/ApiContext";
import ProfileHeader from "../domain/ProfileHeader";
import ProfileContent from "../domain/ProfileContent";

import * as postActions from "../store/actions/post";
import * as relationshipActions from "../store/actions/relationship";
import * as userActions from "../store/actions/user";

import { POSTS_LENGTH, POST_TYPE } from "../constants/profile";
import {
  HOME_ROUTE,
  SETTINGS_ROUTE,
  POST_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
  CHAT_ROUTE,
  FOLLOWERS_ROUTE,
  FOLLOWINGS_ROUTE,
} from "../constants/routes";

const POST_TABS = {
  POSTS: 0,
  FAVORITES: 1,
  TAGGED: 2,
};

const useStyles = makeStyles((theme) => ({
  statistics: {
    margin: theme.spacing(2, 0),
    "& > *:not(:first-child)": {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

function Profile(props) {
  const { username } = useParams();
  const classes = useStyles();
  const { url } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const [postSettings, setPostSettings] = useState({
    index: POST_TABS.POSTS,
    postType: POST_TYPE.DEFAULT,
    tagged: false,
  });

  const { me, user, post, feeling } = props;
  const { resetPosts, fetchUser, fetchPosts, getFavoritePosts } = props;

  const { createFollow, deleteFollow } = props;

  useEffect(() => {
    (async () => {
      await fetchUser(apiClient, username);
    })();
    return () => resetPosts();
  }, [username]);

  useEffect(() => {
    resetPosts();
    if (user.id) {
      (async () => {
        if (postSettings.postType === POST_TYPE.DEFAULT) {
          await fetchPosts(apiClient, {
            userId: user.id,
            length: POSTS_LENGTH,
            tagged: postSettings.tagged,
          });
        } else if (postSettings.postType === POST_TYPE.FAVORITES) {
          await getFavoritePosts(apiClient, { length: POSTS_LENGTH });
        }
      })();
    }
  }, [postSettings, user?.id]);

  if (url.includes(SETTINGS_ROUTE)) {
    return <Redirect to={SETTINGS_EDIT_PROFILE_ROUTE} />;
  }

  if (user.errorMessage) {
    return <Redirect exact to={HOME_ROUTE} />;
  }

  const handleFetchMore = async () => {
    await fetchPosts(apiClient, {
      userId: user.id,
      length: POSTS_LENGTH,
      type: postSettings.postType,
      tagged: postSettings.tagged,
    });
  };

  const handleItemClick = (id) => {
    history.push(`${POST_ROUTE}/${id}`);
  };

  const handleTabChange = (index) => {
    switch (index) {
      case POST_TABS.POSTS: {
        setPostSettings({
          index: POST_TABS.POSTS,
          postType: POST_TYPE.DEFAULT,
          tagged: false,
        });
        break;
      }
      case POST_TABS.FAVORITES: {
        setPostSettings({
          index: POST_TABS.FAVORITES,
          postType: POST_TYPE.FAVORITES,
          tagged: false,
        });
        break;
      }
      case POST_TABS.TAGGED: {
        setPostSettings({
          index: POST_TABS.TAGGED,
          postType: POST_TYPE.DEFAULT,
          tagged: true,
        });
      }
      default:
        return;
    }
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
      <Box my={4}>
        <ProfileHeader
          isOwner={username === me.username}
          isOnline={!user.offlineDate}
          isFollow={user.isFollow}
          avatarUrl={user.avatarUrl}
          imageUrl={user.coverUrl}
          username={user.username}
          fullName={user.name}
          membership={user.membership}
          feeling={feeling.data}
          onPostCreate={() => {}}
          onFollowClick={() => handlePeopleFollow(user.id)}
          onEditCover={handleCoverEdit}
          onMessageClick={() => handleMessageClick(user.username)}
          onSendGiftClick={() => handleGiftSend(user.username)}
        />

        <Typography variant="body2">{user.bio}</Typography>

        <Box className={classes.statistics}>
          <Button disabled={!user.followings} onClick={() => handleFollowingClick(user.username)}>{`${user.followings} following`}</Button>
          <Button disabled={!user.followers} onClick={() => handleFollowersClick(user.username)}>{`${user.followers} followers`}</Button>
        </Box>

        <Divider />

        <ProfileContent
          isOwner={username === me.username}
          tabIndex={postSettings.index}
          items={post.data}
          hasMore={post.hasMore}
          onFetchMore={handleFetchMore}
          onItemClick={handleItemClick}
          onTabChange={handleTabChange}
        />
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
    user: {
      id: state.user.data?.id,
      username: state.user.data?.userName,
      name: state.user.data?.name,
      avatarUrl: state.user.data?.avatarUrl,
      coverUrl: state.user.data?.coverUrl,
      bio: state.user.data?.bio,
      sites: state.user.data?.sites,
      errorMessage: state.user.errorMessage,
      offlineDate: state.user.data?.offlineDate,
      membership: state.user.data?.membership,
      followers: state.user.data?.followersCount,
      followings: state.user.data?.followingsCount,
      isFollow: state.user.data?.isFollow,
    },
    post: {
      count: state.posts.count,
      isFetching: state.posts.isFetching,
      data: postActions.getGridGalleryPosts(state),
      errorMessage: state.posts.errorMessage,
      hasMore: state.posts.hasMore,
    },
    feeling: {
      data: state.posts?.currentFeeling,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),

    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    resetPosts: () => dispatch(postActions.resetPosts()),

    getFavoritePosts: (api, opts) => dispatch(postActions.getFavoritePosts(api, opts)),

    createFollow: (api, userId) => dispatch(relationshipActions.createFollow(api, userId)),
    deleteFollow: (api, userId) => dispatch(relationshipActions.deleteFollow(api, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
