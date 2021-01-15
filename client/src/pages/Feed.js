import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
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
  Link,
  makeStyles,
} from "@material-ui/core";

import { PostsList, PostSprout } from "../domain/PostsList";
import { Tools as MeetTools } from "../components/Meet";

import * as actionSuggestion from "../store/actions/suggestion";
import * as postActions from "../store/actions/post";
import * as settingsActions from "../store/actions/settings";
import * as interestsActions from "../store/actions/interests";
import * as storyActions from "../store/actions/story";
import * as moodAction from "../store/actions/mood";

import { RelationshipList } from "../components/RelationshipList";
import { PreviewStoriesList } from "../domain/StoriesLists";

import ApiContext from "../context/ApiContext";
import { INTERESTS_SKIP, STORIES_LENGTH, POST_TYPE } from "../constants/feed";
import { POST_ROUTE, SUGESTED_PEOPLE } from "../constants/routes";
import InterestList from "../components/InterestsList";
import useSprout from "../hooks/useSprout";

const useStyles = makeStyles((theme) => ({
  suggestionHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    alignItems: "center",
  },
}));

function Feed(props) {
  const history = useHistory();
  const classes = useStyles();
  const apiClient = useContext(ApiContext);
  const interestsEl = useRef();

  const [interestsModalShow, setInterestsModalShow] = useState(false);

  const { userInfo } = props;
  const { settings, getAccountPersonalized } = props;
  const { people, getPeople, createFollow, deleteFollow } = props;
  const { posts, getPosts, createPost, buyPost, likePost, resetPosts, favoritePost, createMood } = props;
  const { interests, getInterests, createInterests } = props;
  const { story, getStory, getFollowingStories, createStory, resetFollowingStories, resetStory } = props;

  const isInterestsSkip = localStorage.getItem(INTERESTS_SKIP);

  const { onSproutSubmit } = useSprout({ createStory, createPost, createMood });

  useEffect(() => {
    (async () => {
      await getAccountPersonalized(apiClient);

      await getPosts(apiClient, {
        userId: userInfo.id,
      });
      await getFollowingStories(apiClient, { length: STORIES_LENGTH });
      await getStory(apiClient, { username: userInfo.userName, length: STORIES_LENGTH });
    })();

    return () => {
      console.log("Unmount feed");
      resetPosts();
      resetStory();
      resetFollowingStories();
    };
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
        await getPosts(apiClient, { id: userInfo.id });
      })();
    }
  };

  const handleLikeClick = useCallback(async (id) => {
    !posts.isFetching && (await likePost(apiClient, id));
  }, []);

  const handleFavoriteClick = useCallback(async (id) => {
    !posts.isFetching && (await favoritePost(apiClient, id));
  }, []);

  const handleFollowPeopleClick = useCallback(async ({ id, isFollow }) => {
    await handleFollowClick(id, isFollow);
  }, []);

  const handleFollowPostClick = useCallback(async ({ id, isFollow }) => {
    await handleFollowClick(id, isFollow);
  }, []);

  const handleFollowClick = async (id, isFollow) => {
    !people.isFetching && isFollow ? await deleteFollow(apiClient, id) : await createFollow(apiClient, id);
  };

  const handleBuyClick = useCallback(async ({ id }) => {
    !posts.isFetching && (await buyPost(apiClient, id));
  }, []);

  const handleFormSubmit = useCallback(async (formData, mediaData) => {
    if (formData.type === POST_TYPE.STORY) {
      await createStory(apiClient, formData, mediaData);
    } else {
      await createPost(apiClient, formData, mediaData);
    }
  }, []);

  const handleInterestSubmit = useCallback(async () => {
    const selectedInterests = interestsEl.current.getSelectedIds();
    if (selectedInterests.length) {
      await createInterests(apiClient, selectedInterests);
      setInterestsModalShow(false);
    }
  }, []);

  const handleGoToClick = useCallback((id) => {
    history.push(`${POST_ROUTE}/${id}`);
  }, []);

  const handleInterestsModalClose = () => {
    setInterestsModalShow(false);
  };

  const handleInterestsModalSkip = () => {
    localStorage.setItem(INTERESTS_SKIP, true);
    setInterestsModalShow(false);
  };

  return (
    <Container>
      <Grid container spacing={2} >
        <Grid item md={8} sm={12} >
          
          {/* <PreviewStoriesList loading={story.isFetching} userStory={story.data.mStories} items={story.data.fStories} /> */}

          <Hidden smDown>
            <PostSprout user={userInfo} onSubmit={onSproutSubmit} />
          </Hidden>

          <PostsList
            items={posts.data}
            hasMore={posts.hasMore}
            onFetchMore={handleFetchMore}
            onGoToClick={handleGoToClick}
            onLikeClick={handleLikeClick}
            onFavoriteClick={handleFavoriteClick}
            onFollowClick={handleFollowPostClick}
            onPayClick={handleBuyClick}
          />
        </Grid>
        <Hidden smDown>
          <Grid item md={4} >
            <Grid container direction="column" alignItems="stretch" spacing={3}>
              {people.data && people.data.length > 0 && (
                <Grid item>
                  <Typography variant="h6" className={classes.suggestionHeader}>
                    Suggestions For You
                    <Link href={SUGESTED_PEOPLE} variant="caption">
                      See All
                    </Link>
                  </Typography>
                  <RelationshipList items={people.data} onFollowClick={handleFollowPeopleClick} />
                </Grid>
              )}

              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Rooms
                </Typography>
                <MeetTools />
              </Grid>
            </Grid>
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
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.signIn?.userInfo,

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
      hasMore: state.story.hasMore,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (api, opts) => dispatch(postActions.getFollowingPosts(api, opts)),
    createPost: (api, post, media) => dispatch(postActions.createPost(api, post, media)),
    buyPost: (api, id) => dispatch(postActions.buyPost(api, id)),
    likePost: (api, id) => dispatch(postActions.likePost(api, id)),
    favoritePost: (api, id) => dispatch(postActions.favoritePost(api, id)),
    resetPosts: () => dispatch(postActions.resetPosts()),

    getPeople: (api, count) => dispatch(actionSuggestion.getPeople(api, count)),
    createFollow: (api, id) => dispatch(actionSuggestion.createFollow(api, id)),
    deleteFollow: (api, id) => dispatch(actionSuggestion.deleteFollow(api, id)),

    getAccountPersonalized: (api) => dispatch(settingsActions.getAccountPersonalized(api)),

    getInterests: (api) => dispatch(interestsActions.getInterests(api)),
    createInterests: (api, ids) => dispatch(interestsActions.createInterests(api, ids)),

    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: (api, opts) => dispatch(storyActions.resetStory(api, opts)),
    createStory: (api, story, media) => dispatch(storyActions.createStorySlide(api, story, media)),
    resetFollowingStories: () => dispatch(storyActions.resetFollowingStories()),
    getFollowingStories: (api, opts) => dispatch(storyActions.getFollowingStories(api, opts)),
    createMood: (api, data) => dispatch(moodAction.createMood(api, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
