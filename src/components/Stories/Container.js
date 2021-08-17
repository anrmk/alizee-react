import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, Avatar, Typography, IconButton, Hidden } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/CloseRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import VolumeUpIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeOffIcon from "@material-ui/icons/VolumeOffRounded";
import MoreHorizIcon from "@material-ui/icons/MoreHorizRounded";
import ArrowCircleIcon from "@material-ui/icons/ArrowDropDownCircleRounded";

import GlobalContext from "./Context/GlobalContext";
import StoriesContext, { UPDATE_STORY_DATA } from "./Context/StoriesContext";
import ProgressContext from "./Context/ProgressContext";
import Story from "./Story";
import ProgressList from "./ProgressList";

import useStyles from "./styles";
import { getDate } from "../../helpers/functions";
import { MEDIA_VIDEO } from "../../constants/media_types";

export default function Container() {
  const [currentId, setCurrentId] = useState(0);
  const [pause, setPause] = useState(true);
  // TODO: maybe remove bufferAction
  const [bufferAction, setBufferAction] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const {
    loop,
    currentIndex,
    isPaused,
    avatarUrl,
    fullName,
    user,
    createdDate,
    onMoreClick,
    onCloseClick,
    onChange,
    onAllStoriesEnd,
    onPrevious,
  } = useContext(GlobalContext);
  const {
    storyOptions: { stories, muted },
    setStoriesOptions,
  } = useContext(StoriesContext);
  const mousedownId = useRef();
  const classes = useStyles({ pause, bufferAction });

  useEffect(() => {
    if (typeof currentIndex === "number") {
      if (currentIndex >= 0 && currentIndex < stories.length) {
        setCurrentIdWrapper(() => currentIndex);
      }
    }
  }, [currentIndex, stories.length]);

  useEffect(() => {
    if (typeof isPaused === "boolean") {
      setPause(isPaused);
    }
  }, [isPaused]);

  const toggleState = (pAction, pBufferAction) => {
    setPause(pAction === "pause");
    setBufferAction(!!pBufferAction);
  };

  const setCurrentIdWrapper = (callback) => {
    setCurrentId(callback);
    toggleState("pause", true);
  };

  const previous = () => {
    if (stories.length <= 1) return;
    setCurrentIdWrapper((prev) => (prev > 0 ? prev - 1 : prev));

    currentId - 1 >= 0 && onChange && onChange(stories, user, currentId - 1);
  };

  const next = () => {
    if (loop) {
      updateNextStoryIdForLoop();
    } else if (currentId + 1 < stories.length) {
      updateNextStoryId();
      onChange && onChange(stories, user, currentId + 1);
      return;
    }

    toggleState("pause", true);
  };

  const updateNextStoryIdForLoop = () => {
    setCurrentIdWrapper((prev) => (prev + 1) % stories.length);
  };

  const updateNextStoryId = () => {
    setCurrentIdWrapper((prev) => {
      if (prev < stories.length - 1) return prev + 1;
      return prev;
    });
  };

  const debouncePause = (e) => {
    e.preventDefault();

    mousedownId.current = setTimeout(() => {
      toggleState("pause");
    }, 200);
  };

  const handleMouseUp = (e, type) => {
    e.preventDefault();
    mousedownId.current && clearTimeout(mousedownId.current);

    if (type === "previous" && currentId === 0) {
      onPrevious && onPrevious(currentId, stories);
    } else if (type === "next" && currentId === stories.length - 1) {
      onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
    }

    if (
      (pause && currentId === 0 && type === "previous") ||
      (pause && currentId >= stories.length - 1 && type === "next") ||
      (pause && currentId < stories.length - 1)
    ) {
      toggleState("play");
    } else if (stories.length > 1) {
      if (type === "previous" && currentId === 0) {
        toggleState("play");
      } else if (type === "next" && currentId === stories.length - 1) {
        toggleState("play");
      } else {
        type === "next" ? next() : previous();
      }
    }
  };

  const handleBtnPlayClick = () => {
    mousedownId.current && clearTimeout(mousedownId.current);

    mousedownId.current = setTimeout(() => {
      toggleState(pause ? "play" : "pause");
    }, 0);
  };

  const handleMuteClick = () => {
    setStoriesOptions({
      type: UPDATE_STORY_DATA,
      payload: { muted: !muted },
    });
  };

  const handleMoreBtnClick = () => {
    toggleState("pause", false);
    onMoreClick && onMoreClick();
  };

  const handleVideoDuration = (duration) => {
    setVideoDuration(duration * 1000);
  };

  return (
    <Box className={classes.container}>
      <Hidden smDown>
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="previous-btn"
            disableRipple
            onClick={(e) => handleMouseUp(e, "previous")}>
            <ArrowCircleIcon
              className={classes.arrowNextIcon}
              fontSize="large"
            />
          </IconButton>
        </Box>
      </Hidden>
      <Box className={classes.content}>
        <Box className={classes.header}>
          <ProgressContext.Provider
            value={{
              bufferAction,
              videoDuration,
              currentId,
              pause,
              next,
            }}>
            <ProgressList />
          </ProgressContext.Provider>
          <Box className={classes.headerInner}>
            <Box className={classes.userInfo}>
              <Avatar src={avatarUrl} />
              <Box>
                {fullName && (
                  <Typography
                    className={classes.headerText}
                    variant="body1"
                    noWrap>
                    {fullName}
                  </Typography>
                )}
                {createdDate && (
                  <Typography
                    className={classes.headerText}
                    variant="caption"
                    noWrap>
                    {getDate(createdDate)}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box className={classes.tools}>
              <IconButton
                className={classes.btn}
                size="small"
                onClick={handleBtnPlayClick}>
                {pause ? <PlayIcon /> : <PauseIcon />}
              </IconButton>
              {stories[currentId]?.kind === MEDIA_VIDEO && (
                <IconButton
                  className={classes.btn}
                  size="small"
                  onClick={handleMuteClick}>
                  {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </IconButton>
              )}
              <IconButton
                className={classes.btn}
                size="small"
                onClick={onCloseClick}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box className={classes.headerShadow} />
        <Story
          action={toggleState}
          bufferAction={bufferAction}
          playState={pause}
          url={stories[currentId]?.url}
          kind={stories[currentId]?.kind}
          onVideoDuration={handleVideoDuration}
        />
        <Box className={classes.footer}>
          <IconButton
            className={classes.btn}
            size="small"
            onClick={handleMoreBtnClick}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
        <Box className={classes.footerShadow} />
        <Box className={classes.overlay}>
          <Box
            className={classes.controls}
            onTouchStart={debouncePause}
            onTouchEnd={(e) => handleMouseUp(e, "previous")}
            onMouseDown={debouncePause}
            onMouseUp={(e) => handleMouseUp(e, "previous")}
          />
          <Box
            className={classes.controls}
            onTouchStart={debouncePause}
            onTouchEnd={(e) => handleMouseUp(e, "next")}
            onMouseDown={debouncePause}
            onMouseUp={(e) => handleMouseUp(e, "next")}
          />
        </Box>
      </Box>
      <Hidden smDown>
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="next-btn"
            disableRipple
            onClick={(e) => handleMouseUp(e, "next")}>
            <ArrowCircleIcon
              className={classes.arrowPreviousIcon}
              fontSize="large"
            />
          </IconButton>
        </Box>
      </Hidden>
    </Box>
  );
}
