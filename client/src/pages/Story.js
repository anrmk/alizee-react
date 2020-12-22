import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Redirect, useRouteMatch, generatePath } from "react-router-dom";
import { Box } from "@material-ui/core";

import ApiContext from "../context/ApiContext";

import { StorySlidesList } from "../domain/StoriesLists";
import * as storyActions from "../store/actions/story";
import { HOME_ROUTE } from "../constants/routes";
import { setUrlWithoutReload } from "../helpers/functions";

function Stories(props) {
  const { userId, storyId } = useParams();
  const { path } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const [storyIndex, setStoryIndex] = useState(0);

  const { story } = props;
  const { getStory, resetStory } = props;

  useEffect(() => {
    if (userId) {
      (async () => {
        await getStory(apiClient, { userId, length: 10 });
      })();
    }

    return () => {
      resetStory();
    }
  }, [])

  useEffect(() => {
    if (story.data.length && storyId) {
      const index = story.data.findIndex(item => item.id === storyId);
      if (index !== -1) {
        setStoryIndex(index);
      }
    }
  }, [story.data])

  if (!userId || story.errorMessage) {
    return <Redirect to={HOME_ROUTE} />;
  }

  const handleSlideChange = (_, slideData) => {
    if (slideData) {
      setUrlWithoutReload(window.location.origin + generatePath(path, { userId, storyId: slideData.id }));
    }
  }

  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <StorySlidesList
        items={story.data}
        startIndex={storyIndex}
        onSlideChange={handleSlideChange} />
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    story: {
      isFetching: state.story.isFetching,
      data: state.story.currentStory,
      errorMessage: state.story.errorMessage,
      hasMore: state.story.hasMore
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: () => dispatch(storyActions.resetStory())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
