import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, Avatar, Typography } from "@material-ui/core";
import ProgressList from "./ProgressList";

import GlobalContext from "./Context/GlobalContext";
import StoriesContext from "./Context/StoriesContext";
import ProgressContext from "./Context/ProgressContext";
import Story from "./Story";
import useStyles from "./styles";

export default function Container() {
  const [currentId, setCurrentId] = useState(0);
  const [pause, setPause] = useState(true);
  // TODO: maybe remove bufferAction
  const [bufferAction, setBufferAction] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const { loop, currentIndex, isPaused, onChange, avatarUrl, fullName } = useContext(GlobalContext);
  const { stories } = useContext(StoriesContext);
  let mousedownId = useRef();
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
  }

  const setCurrentIdWrapper = (callback) => {
    setCurrentId(callback);
    toggleState("pause", true);
  }

  const previous = () => {
    if (stories.length <= 1) return;
    setCurrentIdWrapper(prev => prev > 0 ? prev - 1 : prev);

    onChange && onChange(stories[currentId - 1 >= 0 ? currentId - 1 : 0], currentId);
  }

  const next = () => {
    if (loop) {
      updateNextStoryIdForLoop();
    } else {
      updateNextStoryId();
    }

    onChange && onChange(stories[currentId + 1 < stories.length ? currentId + 1 : stories.length - 1], currentId);
  };

  const updateNextStoryIdForLoop = () => {
    setCurrentIdWrapper(prev => (prev + 1) % stories.length);
  }

  const updateNextStoryId = () => {
    setCurrentIdWrapper(prev => {
      if (prev < stories.length - 1) return prev + 1;
      return prev;
    })
  }

  const debouncePause = (e) => {
    e.preventDefault();
    mousedownId.current = setTimeout(() => {
      toggleState("pause");
    }, 200);
  }

  const handleMouseUp = (e, type) => {
    e.preventDefault()
    mousedownId.current && clearTimeout(mousedownId.current);

    if (pause && currentId === 0 && type === "previous" || 
      pause && currentId >= stories.length - 1 && type === "next" || 
      pause && currentId < stories.length - 1) {
      toggleState("play");
    } else if (stories.length > 1) {
      type === "next" ? next() : previous();
    }
  }

  const handleVideoDuration = (duration) => {
    setVideoDuration(duration * 1000);
  }

  return (
    <Box className={classes.container}>
      <ProgressContext.Provider value={{
        bufferAction: bufferAction,
        videoDuration: videoDuration,
        currentId,
        pause,
        next
      }}>
        <ProgressList />
      </ProgressContext.Provider>
      <Box className={classes.header}>
        <Avatar src={avatarUrl} />
        <Typography className={classes.headerText} variant="body1" noWrap>{fullName}</Typography>
      </Box>
      <Story
        action={toggleState}
        bufferAction={bufferAction}
        playState={pause}
        url={stories[currentId]?.media.url}
        kind={stories[currentId]?.media.kind}
        onVideoDuration={handleVideoDuration} />
      <Box className={classes.overlay}>
        <Box
          className={classes.controls}
          onTouchStart={debouncePause}
          onTouchEnd={e => handleMouseUp(e, "previous")}
          onMouseDown={debouncePause}
          onMouseUp={(e) => handleMouseUp(e, "previous")} />
        <Box
          className={classes.controls}
          onTouchStart={debouncePause}
          onTouchEnd={e => handleMouseUp(e, "next")}
          onMouseDown={debouncePause}
          onMouseUp={(e) => handleMouseUp(e, "next")} />
      </Box>
    </Box>
  );
}
