import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Box } from "@material-ui/core/";

import ApiContext from "../context/ApiContext";
import ProfileDetails from "../domain/ProfileDetails";
import ProfileHeader from "../domain/ProfileHeader";
import ProfileContent from "../domain/ProfileContent";

import * as postActions from "../store/actions/post";
import * as relationshipActions from "../store/actions/relationship";
import * as userActions from "../store/actions/user";

import { POSTS_LENGTH } from "../constants/profile";
import { HOME_ROUTE, SETTINGS_ROUTE, POST_ROUTE, SETTINGS_EDIT_PROFILE_ROUTE } from "../constants/routes";

function Profile(props) {
  const { username } = useParams();
  const { url } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const [postType, setPostType] = useState(0);
  const [tagged, setTagged] = useState(false);

  const { user, me, post, follower, feeling } = props;
  const {
    resetPosts,
    fetchUser,
    fetchPosts,
    fetchFollowers,
    fetchFollowings,
    createFollow,
    getFeeling
  } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
      })();
    }

    return () => resetPosts();
  }, [username]);

  useEffect(() => {
    if (user.username === username && user.id) {
      
      (async () => {
        await getFeeling(apiClient, { userId: user.id });
        await fetchPosts(apiClient, { userId: user.id, length: POSTS_LENGTH, type: postType, tagged });
        await fetchFollowers(apiClient, user.id);
        await fetchFollowings(apiClient, user.id);
      })();
    }
  }, [user.id, postType, tagged]);

  if (url.includes(SETTINGS_ROUTE)) {
    return <Redirect to={SETTINGS_EDIT_PROFILE_ROUTE} />
  }

  if (user.errorMessage) {
    return <Redirect exact to={HOME_ROUTE} />
  }

  const handleFetchMore = async () => {
    await fetchPosts(apiClient, { userId: user.id, length: POSTS_LENGTH, type: postType, tagged });
  };

  const handleItemClick = (id) => {
    history.push(`${POST_ROUTE}/${id}`);
  };

  const handleTabChange = (index) => {
    if (index === 2) {
      setTagged(true);
    } else {
      setTagged(false);
    }
    setPostType(index);
  };

  return (
    <Container>
      <Box my={4}>
        <ProfileHeader
          me={username === me.username}
          avatarUrl={user.avatarUrl}
          username={user.username}
          fullName={user.name}
          feeling={feeling.data}
          onPostCreate={() => { }}
          onEditCover={() => { console.log("onEditCover") }}
        />
        <ProfileDetails
          //TODO Add location and hourly rate props when it will implement on the server side
          offlineDate={user.offlineDate}
          bio={user.bio}
          sites={user.sites}
          username={user.username}
          postCount={post.count}
          followerCount={follower.followerCount}
          followingCount={follower.followingCount}
          onMessageClick={() => console.log("onMessageClick")}
          onFollowClick={createFollow}
          onSendGiftClick={() => console.log("handleSendGift")} />
        <ProfileContent
          media={post.data}
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
      username: state.signIn?.userInfo?.userName,
    },
    user: {
      id: state.user.data?.id,
      username: state.user.data?.userName,
      name: state.user.data?.name,
      avatarUrl: state.user.data?.avatarUrl,
      bio: state.user.data?.bio,
      sites: state.user.data?.sites,
      errorMessage: state.user.errorMessage,
      offlineDate: state.user.data?.offlineDate
    },
    post: {
      count: state.posts.count,
      isFetching: state.posts.isFetching,
      data: postActions.getGridGalleryPosts(state),
      errorMessage: state.posts.errorMessage,
      hasMore: state.posts.hasMore,
    },
    follower: {
      followerCount: state.relationship.followers.length,
      followingCount: state.relationship.followings.length,
    },
    feeling: {
      data: state.posts?.currentFeeling
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFeeling: (api, opts) => dispatch(postActions.getFeeling(api, opts)),
    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    resetPosts: () => dispatch(postActions.resetPosts()),
    fetchFollowers: (api, userId) => dispatch(relationshipActions.getFollowers(api, userId)),
    fetchFollowings: (api, userId) => dispatch(relationshipActions.getFollowings(api, userId)),
    createFollow: (api, userId, followId) => dispatch(relationshipActions.createFollow(api, userId, followId)),
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
