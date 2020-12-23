import React, { useState, useRef, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Hidden,
  makeStyles,
} from "@material-ui/core";

import { PostsList, PostSprout } from "../domain/PostsList";
import { Tools as MeetTools } from "../components/Meet";

import * as actionSuggestion from "../store/actions/suggestion";
import * as postActions from "../store/actions/post";
import * as settingsActions from "../store/actions/settings";
import * as interestsActions from "../store/actions/interests";
import * as storyActions from "../store/actions/story";

import { RelationshipList } from "../components/RelationshipList";
import { PreviewStoriesList } from "../domain/StoriesLists";

import ApiContext from "../context/ApiContext";
import { INTERESTS_SKIP, POSTS_LENGTH, STORIES_LENGTH, POST_TYPE } from "../constants/feed";
import { POST_ROUTE, SUGESTED_PEOPLE } from "../constants/routes";
import InterestList from "../components/InterestsList";

const useStyles = makeStyles((theme) => ({
  suggestion: {
    marginBottom: theme.spacing(3),
  },

  suggestionHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
}));

function Feed(props) {
  const history = useHistory();
  const classes = useStyles();

  const apiClient = useContext(ApiContext);
  const interestsEl = useRef();
  const [interestsModalShow, setInterestsModalShow] = useState(false);
  const { userInfo } = props;
  const { posts } = props;
  const isInterestsSkip = localStorage.getItem(INTERESTS_SKIP);

  const {
    people,
    getPeople,
    followPeopleSuggestions,
    unfollowPeopleSuggestions,
    getAccountPersonalized,
    getInterests,
    createInterests,
    favoritePost,
    buyPost,
    getStory,
    getFollowingStories,
    createStorySlide,
    resetFollowingStories
  } = props;

  const {
    resetPosts,
    fetchPosts,
    createPost,
    likePost,
    settings,
    interests,
    story
  } = props;

  useEffect(() => {
    (async () => {
      await getAccountPersonalized(apiClient);

      if (posts.data.length <= 0) {
        await fetchPosts(apiClient, {
          userId: userInfo.id,
          length: POSTS_LENGTH,
        });
        await getFollowingStories(apiClient, { length: 10 });
        await getStory(apiClient, { userId: userInfo.id, length: STORIES_LENGTH });
      }
    })();

    return () => {
      resetPosts();
      resetFollowingStories();
    }
  }, []);

  useEffect(() => {
    if (settings.isAccountPersonalized !== null && !settings.isAccountPersonalized) {
      (async () => {
        await getInterests(apiClient);
        setInterestsModalShow(false);
      })();
    }
  }, [settings.isAccountPersonalized]);

  useEffect(() => {
    if (userInfo.id) {
      (async () => {
        await getPeople(apiClient, 6);
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

  const handleLikeClick = async (id, isLoading) => {
    !isLoading && (await likePost(apiClient, id));
  };

  const handleFavoriteClick = async (id, isLoading) => {
    !isLoading && (await favoritePost(apiClient, id));
  };

  const handleGoToClick = (id) => {
    history.push(`${POST_ROUTE}/${id}`);
  };

  const handleFollowPeopleClick = (id, isLoading) => {
    if (!isLoading) {
      var follower = people.data.find((u) => u.id === id);
      if (follower) {
        follower.isFollowing ? unfollowPeopleSuggestions(apiClient, id) : followPeopleSuggestions(apiClient, id);
      }
    }
  };

  const handleBuyClick = async ({id, amount}, isLoading) => {
    !isLoading && (await buyPost(apiClient, id));
  }

  const handleFormSubmit = async (formData, mediaData) => {
    if (formData.type === POST_TYPE.STORY) {
      await createStorySlide(apiClient, formData, mediaData);
    } else {
      await createPost(apiClient, formData, mediaData);
    }
  };

  const handleInterestSubmit = async () => {
    const selectedInterests = interestsEl.current.getSelectedIds();
    if (selectedInterests.length) {
      await createInterests(apiClient, selectedInterests);
      setInterestsModalShow(false);
    }
  };

  const handleInterestsModalClose = () => {
    setInterestsModalShow(false);
  };

  const handleInterestsModalSkip = () => {
    localStorage.setItem(INTERESTS_SKIP, true);
    setInterestsModalShow(false);
  }

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={2} direction="row">
          <Grid container item md={8} sm={12} direction="column">
            <Typography variant="h6">
              Top stories
            </Typography>
            <PreviewStoriesList userStory={story.data.mStories} items={story.data.fStories} />
            <PostSprout user={userInfo} onSubmit={handleFormSubmit} />
            <PostsList
              items={posts.data}
              hasMore={posts.hasMore}
              onFetchMore={handleFetchMore}
              onGoToClick={handleGoToClick}
              onLikeClick={(id) => handleLikeClick(id, posts.isFetching)}
              onFavoriteClick={(id) => handleFavoriteClick(id, posts.isFetching)}
              onFollowClick={(id) => handleFollowPeopleClick(id, people.isFetching)}
              onPayClick={(data) => handleBuyClick(data, posts.isFetching)}
            />
          </Grid>
          <Hidden smDown>
            <Grid item md={4} sm={false} >
              <Typography component="h4" className={classes.suggestionHeader}>
                <span>Suggestions For You</span>
                <Link to={SUGESTED_PEOPLE}>
                  <small>See All</small>
                </Link>
              </Typography>
              <RelationshipList items={people.data} onFollowClick={handleFollowPeopleClick} />
              <br />
              <Typography component="h4" gutterBottom>
                Rooms
              </Typography>
              <MeetTools />
            </Grid>
          </Hidden>
        </Grid>

        <Dialog
          open={interestsModalShow && !isInterestsSkip && Object.keys(interests.data).length}
          onClose={handleInterestsModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Choose your interests</DialogTitle>
          <InterestList ref={interestsEl} items={interests.data} />
          <DialogActions>
            <Button onClick={handleInterestsModalSkip}>Skip</Button>
            <Button onClick={handleInterestSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: {
      id: state.signIn?.userInfo?.id,
      userName: state.signIn?.userInfo?.userName,
      avatarUrl: state.signIn?.userInfo?.avatarUrl,
      name: state.signIn?.userInfo?.name,
      bio: state.signIn?.userInfo.bio,
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
    people: {
      isFetching: state.suggestion.people.isFetching,
      data: state.suggestion.people.data,
      errorMessage: state.suggestion.people.errorMessage,
    },
    settings: {
      isAccountPersonalized: state.settings.isAccountPersonalized,
    },
    interests: {
      data: interestsActions.getSelectableInterests(state),
    },
    story: {
      isFetching: state.story.isFetching,
      data: storyActions.getFollowingsStoriesWithMyself(state),
      errorMessage: state.story.errorMessage,
      hasMore: state.story.hasMore
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPosts: () => dispatch(postActions.resetPosts()),
    fetchPosts: (api, opts) => dispatch(postActions.getFollowingPosts(api, opts)),
    createPost: (api, post, media) => dispatch(postActions.createPost(api, post, media)),
    buyPost: (api, id) => dispatch(postActions.buyPost(api, id)),
    getPeople: (api, count) => dispatch(actionSuggestion.getPeople(api, count)),
    likePost: (api, id) => dispatch(postActions.likePost(api, id)),
    favoritePost: (api, id) => dispatch(postActions.favoritePost(api, id)),
    followPeopleSuggestions: (api, id) => dispatch(actionSuggestion.followPeopleSuggestions(api, id)),
    unfollowPeopleSuggestions: (api, id) => dispatch(actionSuggestion.unfollowPeopleSuggestions(api, id)),
    getAccountPersonalized: (api) => dispatch(settingsActions.getAccountPersonalized(api)),
    getInterests: (api) => dispatch(interestsActions.getInterests(api)),
    createInterests: (api, ids) => dispatch(interestsActions.createInterests(api, ids)),
    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    getFollowingStories: (api, opts) => dispatch(storyActions.getFollowingStories(api, opts)),
    createStorySlide: (api, story, media) => dispatch(storyActions.createStorySlide(api, story, media)),
    resetFollowingStories: () => dispatch(storyActions.resetFollowingStories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
