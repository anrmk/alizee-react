import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PostList from "../domain/PostsList";

import * as actionSuggestion from "../store/actions/suggestion";

import CreatePostForm from '../domain/CreatePostForm';
import { SuggestionList } from "../components/Suggestion";

import * as postActions from '../store/actions/post';
import ApiContext from "../context/ApiContext";
import { POSTS_LENGTH } from "../constants/feed";

import { AvatarItem } from "../components/Avatar";

function Feed(props) {
  const apiClient = useContext(ApiContext);
  const { userInfo } = props;
  const { peopleSuggestions, getPeopleSuggestions, followPeopleSuggestions, unfollowPeopleSuggestions } = props;

  const { isFetching, posts, offset } = props;
  const { fetchPosts, createPost } = props;

  useEffect(() => {
    fetchPosts(apiClient, { offset, length: POSTS_LENGTH });
    getPeopleSuggestions(apiClient, 6)
  }, []);

  const handleFetchMore = () => {
    fetchPosts(apiClient, { offset, length: POSTS_LENGTH });
  }

  const handleFormSubmit = async (formData, mediaData) => {
    if (!formData.description) return;

    createPost(apiClient, formData, mediaData);
  };

  const handleFollowPeople = (id) => {
    var follower = peopleSuggestions.data.find(u=> u.id === id);
    if(follower) {
      follower.isFollowing ? unfollowPeopleSuggestions(apiClient, id) : followPeopleSuggestions(apiClient, id);
    }
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-lg-8 col-md-12">
        <CreatePostForm onSubmit={handleFormSubmit} />
          <PostList 
            items={posts.data}
            hasMore={posts.hasMore}
            onFetchMore={handleFetchMore}/>
        </div>
        <div className="col-lg-4 d-none d-lg-block d-xl-block">
          {/* TODO: Go to Profile page on click */}
          <div className="mt-4 mb-4">
            <AvatarItem size="large" title={userInfo.userName} subtitle={userInfo.fullName} url={userInfo.avatarUrl} />
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Suggestions For You</span>
            <Link to="/people/suggested">See All</Link>
          </div>
          <SuggestionList list={peopleSuggestions.data} followOnClick={handleFollowPeople} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    // isFetching: state.posts.isFetching,
    // offset: state.posts.offset,
    // data: state.posts.data,
    // errorMessage: state.posts.errorMessage,

    userInfo: {
      userName: state.signIn.userInfo.userName,
      avatarUrl: state.signIn.userInfo.avatarUrl,
      fullName: state.signIn.userInfo.name +" "+ state.signIn.userInfo.surname
    },
    posts: {
      isFetching: state.posts.isFetching,
      offset: state.posts.offset,
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
    fetchPosts: (api, opts) => dispatch(postActions.getPosts(api, opts)),
    createPost: async (api, post, media) => dispatch(postActions.createPost(api, post, media)),
    getPeopleSuggestions: (api, count) => dispatch(actionSuggestion.getPeopleSuggestions(api, count)),
    followPeopleSuggestions: (api, id) => dispatch(actionSuggestion.followPeopleSuggestions(api, id)),
    unfollowPeopleSuggestions: (api, id) => dispatch(actionSuggestion.unfollowPeopleSuggestions(api, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
