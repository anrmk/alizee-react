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
  const { currentId, next, videoDuration, pause, bufferAction } = useContext(ProgressContext);
  const { defaultInterval, onStoryEnd, onStoryStart, onAllStoriesEnd } = useContext(GlobalContext);
  const { stories } = useContext(StoriesContext);
  const classes = useStyles({ pause, bufferAction });
  let animationFrameId = useRef();

  useEffect(() => {
    setCount(0);
  }, [currentId, stories]);

  useEffect(() => {
    if (!pause) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
    }
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    }
  }, [currentId, pause]);

  let countCopy = count;
  const incrementCount = () => {
    if (countCopy === 0) storyStartCallback();
    setCount(count => {
      const interval = getCurrentInterval();
      countCopy = count + (100 / ((interval / 1000) * 60));
      return count + (100 / ((interval / 1000) * 60));
    })

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
  }

  const storyStartCallback = () => {
    onStoryStart && onStoryStart(currentId, stories[currentId]);
  }

  const storyEndCallback = () => {
    onStoryEnd && onStoryEnd(currentId, stories[currentId]);
  }

  const allStoriesEndCallback = () => {
    onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
  }

  const getCurrentInterval = () => {
    if (stories[currentId]?.kind === MEDIA_VIDEO) return videoDuration;

    return defaultInterval;
  }

  return (
    <Box className={classes.progressList}>
      {stories.map((_, i) =>
        <Progress
          key={i}
          count={count}
          width={1 / stories.length}
          active={i === currentId ? 1 : (i < currentId ? 2 : 0)} />
      )}
    </Box>
  );
}
