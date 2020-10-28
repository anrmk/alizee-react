import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PostList from "../domain/PostsList";
import CreatePostForm from '../domain/CreatePostForm';

import * as actionSuggestion from "../store/actions/suggestion";
import * as postActions from '../store/actions/post';

import { RelationshipList } from "../components/RelationshipList";
import { AvatarItem } from "../components/Avatar";

import ApiContext from "../context/ApiContext";
import { POSTS_LENGTH } from "../constants/feed";
import { PROFILE_ROUTE } from "../constants/routes";
import CustomLink from "../components/CustomLink";

function Feed(props) {
  const apiClient = useContext(ApiContext);

  const { userInfo } = props;
  const { posts } = props;

  const {
    peopleSuggestions,
    getPeopleSuggestions,
    followPeopleSuggestions,
    unfollowPeopleSuggestions,
  } = props;
  const { 
    resetPosts, 
    fetchPosts, 
    createPost,
    likePost
  } = props;

  useEffect(() => {
    (async () => {
      if (posts.data.length <= 0) {
        resetPosts();
        await fetchPosts(apiClient, { userId: userInfo.id, length: POSTS_LENGTH });
      }
    })();
  }, [])

  useEffect(() => {
    if (userInfo.id) {
      (async () => {
        await getPeopleSuggestions(apiClient, 6)
      })();
    }
  }, [userInfo.id])

  const handleFetchMore = isLoading => {
    if (!isLoading) {
      (async () => {
        await fetchPosts(apiClient, { id: userInfo.id, length: POSTS_LENGTH })
      })();
    }
  }

  const handleFormSubmit = async (formData, mediaData) => {
    createPost(apiClient, formData, mediaData);
  };

  const handleFollowPeople = (id) => {
    var follower = peopleSuggestions.data.find(u=> u.id === id);
    if(follower) {
      follower.isFollowing ? unfollowPeopleSuggestions(apiClient, id) : followPeopleSuggestions(apiClient, id);
    }
  }

  const handleOnFavoriteClick = async (id, isLoading) => {
    !isLoading && await likePost(apiClient, id);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <CreatePostForm onSubmit={handleFormSubmit} user={userInfo} />
          <PostList items={posts.data} hasMore={posts.hasMore} onFetchMore={handleFetchMore} onFavoriteClick={({ id }) => handleOnFavoriteClick(id, posts.isFetching)} />
        </div>
        <div className="col-lg-4 d-none d-lg-block d-xl-block">
          <div className="mt-4 mb-4">
            <AvatarItem url={userInfo.avatarUrl} >
              <CustomLink as="div" to={PROFILE_ROUTE(userInfo.userName)} >
                {userInfo.userName} <br />
              </CustomLink>
              <small className="text-muted">{userInfo.fullName}</small>
            </AvatarItem>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Suggestions For You</span>
            <Link to="/people/suggested">See All</Link>
          </div>
          <RelationshipList items={peopleSuggestions.data} onFollowClick={handleFollowPeople} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: {
      id: state.signIn?.userInfo?.id,
      userName: state.signIn?.userInfo?.userName,
      avatarUrl: state.signIn?.userInfo?.avatarUrl,
      name: state.signIn?.userInfo?.name
    },
    posts: {
      isFetching: state.posts.isFetching,
      data: state.posts?.data,
      errorMessage: state.posts.errorMessage,
      hasMore: state.posts.hasMore,
    },
    media: {
      isFetching: state.media.isFetching,
      data: state.media.data,
    },
    peopleSuggestions: {
        isFetching: state.suggestion.people.isFetching,
        data: state.suggestion?.people,
        errorMessage: state.suggestion.people.errorMessage
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetPosts: () => dispatch(postActions.resetPosts()),
    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    createPost: (api, post, media) => dispatch(postActions.createPost(api, post, media)),
    getPeopleSuggestions: (api, count) => dispatch(actionSuggestion.getPeopleSuggestions(api, count)),
    likePost: (api, id) => dispatch(postActions.likePost(api, id)),
    followPeopleSuggestions: (api, id) => dispatch(actionSuggestion.followPeopleSuggestions(api, id)),
    unfollowPeopleSuggestions: (api, id) => dispatch(actionSuggestion.unfollowPeopleSuggestions(api, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
