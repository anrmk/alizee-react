import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams, Redirect, useRouteMatch, generatePath } from "react-router-dom";
import { Box } from "@material-ui/core";

import Stories from "../components/Stories";

import ApiContext from "../context/ApiContext";
import * as storyActions from "../store/actions/story";
import * as actionChat from "../store/actions/chat";
import { DEFAULT_ROUTE, HOME_ROUTE, STORIES_ROUTE } from "../constants/routes";
import dialogs, { STORY_DIALOG_TYPE, CHAT_LIST_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "../hooks/useDialog";
import { getUrlTo } from "../helpers/functions";
import { STORY_MESSAGE_TYPE } from "../constants/message_types";

function Story(props) {
  const history = useHistory();
  const { username, storyId } = useParams();
  const { path } = useRouteMatch();
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const [currentSlideId, setCurrentSlideId] = useState();
  const [storyIndex, setStoryIndex] = useState(0);
  const [selectedChats, setSelectedChats] = useState([]);

  const { story, chat } = props;
  const { getStory, resetStory, getRooms, shareMessage } = props;

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
      setCurrentSlideId(story.data.slides[0].id);

      if (storyId) {
        const index = story.data.slides.findIndex(item => item.id === storyId);
        if (index !== -1) {
          setStoryIndex(index);
        }
      }
    }
  }, [story.data.slides]);

  useEffect(() => {
    if (chat.data.length) {
      setDataChatListDialog();
    }
  }, [chat.data, selectedChats]);

  if (!username || story.errorMessage) {
    return <Redirect to={HOME_ROUTE} />;
  }

  const openStoryDialog = () => {
    dialog.toggle(dialogs[STORY_DIALOG_TYPE](null, {
      onShareClick: handleShareBtnClick,
      onReportClick: handleShareDialogBtnClick
    }));
  }

  const setDataChatListDialog = () => {
    dialog.setParams(dialogs[CHAT_LIST_DIALOG_TYPE]({
      loading: false,
      tempData: selectedChats,
      onMainClick: handleShareDialogBtnClick
    }, {
      items: chat.data,
      onBackClick: openStoryDialog,
      onItemSelect: (selected) => setSelectedChats(selected)
    }));
  }

  const handleShareDialogBtnClick = async (items) => {
    if (!items.length || !currentSlideId) return;

    const followersUsernames = items.map(item => item.userName);

    !chat.isFetching &&
      await shareMessage(apiClient, {
        followersUsernames: followersUsernames,
        message: getUrlTo(STORIES_ROUTE(currentSlideId, username)),
        type: STORY_MESSAGE_TYPE
      });
    dialog.toggle({ open: false });
  }

  const handleSlideChange = (slide) => {
    if (slide) {
      history.replace({ pathname: generatePath(path, { username, storyId: slide.id }) });
      setCurrentSlideId(slide.id);
    }
  }

  const handleShareBtnClick = async () => {
    dialog.toggle(dialogs[CHAT_LIST_DIALOG_TYPE]({
      loading: true,
      onMainClick: handleShareDialogBtnClick
    }, {
      onBackClick: openStoryDialog,
    }));
    !chat.isFetching && await getRooms(apiClient);
  }

  const handleDialogToggle = () => {
    openStoryDialog();
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
    },
    chat: {
      isFetching: state.chat.isFetching,
      data: actionChat.getFilteredRooms(state),
      errorMessage: state.chat.errorMessage
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStory: (api, opts) => dispatch(storyActions.getStory(api, opts)),
    resetStory: () => dispatch(storyActions.resetStory()),
    getRooms: (api) => dispatch(actionChat.getRooms(api)),
    shareMessage: (api, followersIds, message) => dispatch(actionChat.shareMessage(api, followersIds, message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
