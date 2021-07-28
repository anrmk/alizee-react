/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext, useRef } from "react";
import { Box } from "@material-ui/core";

import { MEDIA_VIDEO } from "../../constants/media_types";
import ProgressContext from "./Context/ProgressContext";
import StoriesContext from "./Context/StoriesContext";
import GlobalContext from "./Context/GlobalContext";
import Progress from "./Progress";
import useStyles from "./styles";

export default function ProgressList() {
  const [count, setCount] = useState(0);
  const { currentId, next, videoDuration, pause } = useContext(ProgressContext);
  const { defaultInterval, onStoryEnd, onStoryStart, onAllStoriesEnd } =
    useContext(GlobalContext);
  const {
    storyOptions: { stories },
  } = useContext(StoriesContext);
  const classes = useStyles();
  const animationFrameId = useRef();

  useEffect(() => {
    setCount(0);
  }, [currentId, stories]);

  useEffect(() => {
    if (!pause) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
    }
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [pause]);

  let countCopy = count;
  const incrementCount = () => {
    if (countCopy === 0) storyStartCallback();

    setCount((prevCount) => {
      const interval = getCurrentInterval();
      countCopy = prevCount + 100 / ((interval / 1000) * 60);
      return prevCount + 100 / ((interval / 1000) * 60);
    });

    if (countCopy < 100) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
    } else {
      storyEndCallback();
      if (currentId === stories.length - 1) {
        allStoriesEndCallback();
      }
      cancelAnimationFrame(animationFrameId.current);
      next();
    }
  };

  const storyStartCallback = () => {
    onStoryStart && onStoryStart(currentId, stories[currentId]);
  };

  const storyEndCallback = () => {
    onStoryEnd && onStoryEnd(currentId, stories[currentId]);
  };

  const allStoriesEndCallback = () => {
    onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
  };

  const getCurrentInterval = () => {
    if (stories[currentId]?.media?.kind === MEDIA_VIDEO) return videoDuration;

    return defaultInterval;
  };

  return (
    <Box className={classes.progressList}>
      {stories.length &&
        stories.map((_, i) => (
          <Progress
            key={i}
            count={count}
            width={1 / stories.length}
            active={i === currentId ? 1 : i < currentId ? 2 : 0}
          />
        ))}
    </Box>
  );
}
