import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams, Redirect, useRouteMatch, generatePath } from "react-router-dom";
import { Box } from "@material-ui/core";

import ApiContext from "../context/ApiContext";

import Stories from "../components/Stories";
import * as storyActions from "../store/actions/story";
import { HOME_ROUTE } from "../constants/routes";

function Story(props) {
  const history = useHistory();
  const { username, storyId } = useParams();
  const { path } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const [storyIndex, setStoryIndex] = useState(0);

  const { story } = props;
  const { getStory, resetStory } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await getStory(apiClient, { username, length: 10 });
      })();
    }

    return () => {
      resetStory();
    }
  }, []);

  useEffect(() => {
    if (story.data.slides?.length && storyId) {
      const index = story.data.slides.findIndex(item => item.id === storyId);
      if (index !== -1) {
        setStoryIndex(index);
      }
    }
  }, [story.data.slides]);

  if (!username || story.errorMessage) {
    return <Redirect to={HOME_ROUTE} />;
  }

  const handleSlideChange = (slide) => {
    if (slide) {
      history.replace({ pathname: generatePath(path, { username, storyId: slide.id }) })
    }
  }

  return (
    <Box display="flex" justifyContent="center" height="100vh">
      {/* {JSON.stringify(story.data.slides)} */}
      <Stories
        defaultInterval={4000}
        currentIndex={storyIndex}
        user={story.data.user}
        avatarUrl={story.data.user?.avatarUrl}
        fullName={story.data.user?.name}
        stories={story.data.slides}
        onChange={handleSlideChange} />
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
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: () => dispatch(storyActions.resetStory())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
