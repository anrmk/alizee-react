import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams, Redirect, useRouteMatch, generatePath } from "react-router-dom";
import { Box } from "@material-ui/core";

import Stories from "../components/Stories";

import ApiContext from "../context/ApiContext";
import * as storyActions from "../store/actions/story";
import { DEFAULT_ROUTE, HOME_ROUTE } from "../constants/routes";
import dialogs, { STORY_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "../hooks/useDialog";
import useShareDialog, { SHARE_DIALOG_STORY_TYPE } from "../hooks/useShareDialog";

function Story(props) {
  const history = useHistory();
  const { username, storyId } = useParams();
  const { path } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const [currentSlideId, setCurrentSlideId] = useState(storyId);
  const [storyIndex, setStoryIndex] = useState(0);

  const { story } = props;
  const { getStory, resetStory } = props;

  const { dialogShareOpenClick } = useShareDialog({
    withStack: true,
    type: SHARE_DIALOG_STORY_TYPE
  });

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
    if (story.data.slides?.length) {
      if (!storyId) {
        setCurrentSlideId(story.data.slides[0].id);
      }

      if (storyId) {
        const index = story.data.slides.findIndex(item => item.id === storyId);
        if (index !== -1) {
          setStoryIndex(index);
        }
      }
    }
  }, [story.data.slides]);

  if (!username || story.errorMessage) {
    return <Redirect to={HOME_ROUTE} />;
  }

  const handleSlideChange = (slide) => {
    if (slide) {
      history.replace({ pathname: generatePath(path, { username, storyId: slide.id }) });
      setCurrentSlideId(slide.id);
    }
  }

  const handleDialogToggle = () => {
    dialog.reset();
    dialog.toggleWithStack(dialogs[STORY_DIALOG_TYPE](null, {
      onShareClick: () => dialogShareOpenClick({ id: currentSlideId, userName: username }),
      onReportClick: () => dialog.toggle({ open: false }) // TODO: mocked
    }));
  }

  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <Stories
        defaultInterval={4000}
        currentIndex={storyIndex}
        user={story.data.user}
        avatarUrl={story.data.user?.avatarUrl}
        fullName={story.data.user?.name}
        stories={story.data.slides}
        onMoreClick={handleDialogToggle}
        onCloseClick={() => history.push(DEFAULT_ROUTE)}
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
    resetStory: () => dispatch(storyActions.resetStory()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
