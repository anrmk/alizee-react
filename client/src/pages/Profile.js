import React, { useContext, useEffect } from 'react'
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ApiContext from '../context/ApiContext';
import ProfileHeader from "../domain/ProfileHeader";
import ProfileContent from "../domain/ProfileContent";
import * as postActions from '../store/actions/post';
import * as relationshipActions from '../store/actions/relationship';
import * as userActions from '../store/actions/user';
import { POSTS_LENGTH } from '../constants/profile';

function Profile(props) {
  const { username } = useParams()

  const apiClient = useContext(ApiContext);

  const { user, me, post, follower } = props;
  const { 
    resetPosts,
    fetchUser,
    fetchPosts,
    fetchFollowers,
    fetchFollowings,
  } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
      })();
    }
  }, [username])

  useEffect(() => {
    if (user.username === username && user.id) {
      resetPosts();
      (async () => {
        await fetchPosts(apiClient, { userId: user.id, length: POSTS_LENGTH });
        await fetchFollowers(apiClient, user.id);
        await fetchFollowings(apiClient, user.id);
      })();
    }
  }, [user.id])

  const handleFetchMore = async () => {
    await fetchPosts(apiClient, { length: POSTS_LENGTH });
  }

  return (
    <div className="container pt-3">
      <ProfileHeader
        me={username === me.username}
        avatarUrl={user.avatarUrl}
        username={user.username}
        fullName={user.name}
        bio={user.bio}
        sites={user.sites}
        postsCount={post.count}
        followersCount={follower.followersCount}
        followingCount={follower.followingsCount}
        onEditClick={() => {}}
        onMessageClick={() => {}}
        onFollowClick={() => {}}
        onSettingsClick={() => {}} />
      <ProfileContent 
        media={post.data} 
        hasMore={post.hasMore}
        onFetchMore={handleFetchMore} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    me: {
      username: state.signIn?.userInfo?.userName
    },
    user: {
      id: state.user.data?.id,
      username: state.user.data?.userName,
      name: state.user.data?.name,
      avatarUrl: state.user.data?.avatarUrl,
      bio: state.user.data?.bio,
      sites: state.user.data?.sites
    },
    post: {
      count: state.posts.data.length,
      isFetching: state.posts.isFetching,
      data: postActions.getGridGalleryPosts(state),
      errorMessage: state.posts.errorMessage,
      hasMore: state.posts.hasMore
    },
    follower: {
      followersCount: state.relationship.followers.length,
      followingsCount: state.relationship.followings.length
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    resetPosts: () => dispatch(postActions.resetPosts()),
    fetchFollowers: (api, userId) => dispatch(relationshipActions.getFollowers(api, userId)),
    fetchFollowings: (api, userId) => dispatch(relationshipActions.getFollowings(api, userId)),
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
