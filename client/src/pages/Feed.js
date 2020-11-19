import React, { useState, useEffect, useContext, useRef } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { palette } from '@material-ui/system';
import {
  Container,
  Box,
  Grid,
  Divider,
  Typography,
  Icon,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Hidden,
  makeStyles
} from "@material-ui/core";


import { PostsList, PostSprout } from "../domain/PostsList";
import {Tools as MeetTools} from "../components/Meet";

import * as actionSuggestion from "../store/actions/suggestion";
import * as postActions from "../store/actions/post";
import * as settingsActions from "../store/actions/settings";
import * as interestsActions from "../store/actions/interests";

import { RelationshipList } from "../components/RelationshipList";

import ApiContext from "../context/ApiContext";
import { INTERESTS_SKIP, POSTS_LENGTH } from "../constants/feed";
import { POST_ROUTE, PROFILE_ROUTE, SUGESTED_PEOPLE } from "../constants/routes";
import InterestList from "../components/InterestsList";

const useStyles = makeStyles((theme) => ({
  suggestion: {
    marginBottom: theme.spacing(3),
  },

  suggestionHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  }
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
    peopleSuggestions,
    getPeopleSuggestions,
    followPeopleSuggestions,
    unfollowPeopleSuggestions,
    getAccountPersonalized,
    getInterests,
  } = props;

  const { 
    resetPosts, 
    fetchPosts, 
    createPost, 
    likePost, 
    settings, 
    interests,
    createInterests
  } = props;

  useEffect(() => {
    (async () => {
      await getAccountPersonalized(apiClient);

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
    if (settings.isAccountPersonalized !== null && !settings.isAccountPersonalized) {
      (async () => {
        await getInterests(apiClient);
        setInterestsModalShow(false);
      })();
    }
  }, [settings.isAccountPersonalized])

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
    await createPost(apiClient, formData, mediaData);
  };

  const handleInterestSubmit = async () => {
    const selectedInterests = interestsEl.current.getSelectedIds();
    if (selectedInterests.length) {
      await createInterests(apiClient, selectedInterests);
      setInterestsModalShow(false);
    }
  }

  const handleInterestsModalClose = () => {
    setInterestsModalShow(false);
  }

  const handleInterestsModalSkip = () => {
    localStorage.setItem(INTERESTS_SKIP, true);
    setInterestsModalShow(false);
  }

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={2} direction="row">
          <Grid container item md={8} sm={12} direction="column">
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
          </Grid>
          <Hidden smDown>
            <Grid item md={4} sm={true}>
              <Card className={classes.suggestion}>
                <CardActionArea onClick={() => history.push(PROFILE_ROUTE(userInfo.userName))}>
                  <CardHeader
                    avatar={<Avatar src={userInfo.avatarUrl} />}
                    title={userInfo.name}
                    subheader={userInfo.bio}
                  />
                </CardActionArea>
                <Divider />
                <CardContent>
                  <Typography component="div" className={classes.suggestionHeader} >
                    <span>Suggestions For You</span>
                    <Link to={SUGESTED_PEOPLE}><small>See All</small></Link>
                  </Typography>
                  <RelationshipList items={peopleSuggestions.data} onFollowClick={handleFollowPeopleClick} />
                </CardContent>
              </Card>

              <MeetTools />
            </Grid>
          </Hidden>
        </Grid>
        <Dialog
          open={interestsModalShow && !isInterestsSkip && Object.keys(interests.data).length}
          onClose={handleInterestsModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Choose your interests</DialogTitle>
          <InterestList ref={interestsEl} items={interests.data} />
          <DialogActions>
            <Button onClick={handleInterestsModalSkip}>Skip</Button>
            <Button onClick={handleInterestSubmit} color="primary">Save</Button>
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
      bio: state.signIn?.userInfo.bio
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
    settings: {
      isAccountPersonalized: state.settings.isAccountPersonalized,
    },
    interests: {
      data: interestsActions.getSelectableInterests(state),
    }
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
    getAccountPersonalized: (api) => dispatch(settingsActions.getAccountPersonalized(api)),
    getInterests: (api) => dispatch(interestsActions.getInterests(api)),
    createInterests: (api, ids) => dispatch(interestsActions.createInterests(api, ids))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
