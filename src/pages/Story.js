/* eslint-disable no-debugger */
import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import {
  useHistory,
  useParams,
  Redirect,
  useRouteMatch,
  generatePath,
  useLocation,
} from "react-router-dom";
import { Box } from "@material-ui/core";

import Stories from "../components/Stories";

import ApiContext from "../context/ApiContext";
import * as storyActions from "../store/actions/story";
import { DEFAULT_ROUTE, HOME_ROUTE } from "../constants/routes";
import dialogs, { STORY_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "../hooks/useDialog";
import useStoriesSwitcher from "../hooks/useStoriesSwitcher";
import useShareDialog, {
  SHARE_DIALOG_STORY_TYPE,
} from "../hooks/useShareDialog";
import useFullScreen from "../hooks/useFullScreen";

function Story({ story, getStory, getFollowingStories, resetStory }) {
  const history = useHistory();
  const location = useLocation(DEFAULT_ROUTE);
  const { username, slideId } = useParams();
  const { path } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const fullScreen = useFullScreen("root");

  debugger;
  const {
    currentSlideId,
    currentSlideIndex,
    localSlides,
    currentUser,
    handlePreviousStory,
    handleNextStory,
    handleSlideChange,
  } = useStoriesSwitcher({
    data: story.current, // story.data.length ? story.data : story.current,
    slideId,
    storyId: location.state?.storyId,
    onUpdatePath: handlePathUpdate,
  });

  const shareDialog = useShareDialog({
    withStack: true,
    type: SHARE_DIALOG_STORY_TYPE,
  });

  useEffect(() => {
    if (username) {
      (async () => {
        await getStory(apiClient, { username, length: 10 });
      })();
    }

    return () => {
      fullScreen.toggle(false);
      resetStory();
    };
  }, []);

  function handlePathUpdate(userName, pSlideId) {
    history.replace({
      pathname: generatePath(path, { username: userName, slideId: pSlideId }),
    });
  }

  if (!username || story.errorMessage) {
    return <Redirect to={HOME_ROUTE} />;
  }

  const handleDialogToggle = () => {
    dialog.reset();
    dialog.toggleWithStack(
      dialogs[STORY_DIALOG_TYPE](null, {
        onShareClick: () =>
          shareDialog.toggle({ id: currentSlideId, userName: username }),
        onReportClick: () => dialog.toggle({ open: false }), // TODO: mocked
      })
    );
  };

  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <Stories
        defaultInterval={4000}
        currentIndex={currentSlideIndex}
        avatarUrl={currentUser?.avatarUrl}
        fullName={currentUser?.name}
        userName={currentUser.userName}
        stories={localSlides}
        onMoreClick={handleDialogToggle}
        onCloseClick={() => history.push(DEFAULT_ROUTE)}
        onChange={handleSlideChange}
        onAllStoriesEnd={handleNextStory}
        onPrevious={handlePreviousStory}
      />
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    story: {
      isFetching: state.story.isFetching,
      data: state.story.data,
      current: state.story.currentStory,
      errorMessage: state.story.errorMessage,
      hasMore: state.story.hasMore,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: () => dispatch(storyActions.resetStory()),
    getFollowingStories: (api, opts) =>
      dispatch(storyActions.getFollowingStories(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
