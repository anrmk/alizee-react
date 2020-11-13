import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { PostsList, PostSprout } from "../domain/PostsList";

import * as actionSuggestion from "../store/actions/suggestion";
import * as postActions from "../store/actions/post";

import { RelationshipList } from "../components/RelationshipList";
import { AvatarItem } from "../components/Avatar";
import CustomLink from "../components/CustomLink";

import ApiContext from "../context/ApiContext";
import { POSTS_LENGTH } from "../constants/feed";
import { PROFILE_ROUTE, POST_ROUTE, SUGESTED_PEOPLE } from "../constants/routes";

function Feed(props) {
  const history = useHistory();

  const apiClient = useContext(ApiContext);
  const { userInfo } = props;
  const { posts } = props;

  const { peopleSuggestions, getPeopleSuggestions, followPeopleSuggestions, unfollowPeopleSuggestions } = props;

  const { resetPosts, fetchPosts, createPost, likePost } = props;
  const [postType, setPostType] = useState("");

  useEffect(() => {
    (async () => {
      if (posts.data.length <= 0) {
        resetPosts();
        await fetchPosts(apiClient, {
          userId: userInfo.id,
          length: POSTS_LENGTH,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      (async () => {
        await getPeopleSuggestions(apiClient, 6);
      })();
    }
  }, [userInfo.id]);

  const handleFetchMore = (isLoading) => {
    if (!isLoading) {
      (async () => {
        await fetchPosts(apiClient, { id: userInfo.id, length: POSTS_LENGTH });
      })();
    }
  };

  const handleFavoriteClick = async (id, isLoading) => {
    !isLoading && (await likePost(apiClient, id));
  };

  const handleGoToClick = (id) => {
    history.push(`${POST_ROUTE}/${id}`);
  };

  const handleByClick = ({ id }) => {
    console.log("handleByClick");
  };

  const handleFollowPeopleClick = (id, isLoading) => {
    if (!isLoading) {
      var follower = peopleSuggestions.data.find((u) => u.id === id);
      if (follower) {
        follower.isFollowing ? unfollowPeopleSuggestions(apiClient, id) : followPeopleSuggestions(apiClient, id);
      }
    }
  };

  const handleFormSubmit = async (formData, mediaData) => {
    createPost(apiClient, formData, mediaData);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <PostSprout user={userInfo} onSubmit={handleFormSubmit} />
          <PostsList
            items={posts.data}
            hasMore={posts.hasMore}
            onFetchMore={handleFetchMore}
            onGoToClick={handleGoToClick}
            onFollowClick={(id) => handleFollowPeopleClick(id, peopleSuggestions.isFetching)}
            onFavoriteClick={({ id }) => handleFavoriteClick(id, posts.isFetching)}
            onBuyClick={handleByClick}
          />
        </div>
        <div className="col-lg-4 d-none d-lg-block d-xl-block">
          <div className="sticky-top" style={{ top: "100px" }}>
            <div className="mt-4 mb-4">
              <AvatarItem url={userInfo.avatarUrl}>
                <CustomLink as="div" to={PROFILE_ROUTE(userInfo.userName)}>
                  {userInfo.userName}
                </CustomLink>
                <small className="text-muted">{userInfo.fullName}</small>
              </AvatarItem>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Suggestions For You</span>
              <Link to={`${SUGESTED_PEOPLE}`}>See All</Link>
            </div>
            <RelationshipList items={peopleSuggestions.data} onFollowClick={handleFollowPeopleClick} />
          </div>
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
      name: state.signIn?.userInfo?.name,
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
      isFetching: state.suggestion.isFetching,
      data: state.suggestion?.people,
      errorMessage: state.suggestion.errorMessage,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPosts: () => dispatch(postActions.resetPosts()),
    fetchPosts: (api, opts) => dispatch(postActions.getFollowingPosts(api, opts)),
    createPost: (api, post, media) => dispatch(postActions.createPost(api, post, media)),
    getPeopleSuggestions: (api, count) => dispatch(actionSuggestion.getPeopleSuggestions(api, count)),
    likePost: (api, id) => dispatch(postActions.likePost(api, id)),
    followPeopleSuggestions: (api, id) => dispatch(actionSuggestion.followPeopleSuggestions(api, id)),
    unfollowPeopleSuggestions: (api, id) => dispatch(actionSuggestion.unfollowPeopleSuggestions(api, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
