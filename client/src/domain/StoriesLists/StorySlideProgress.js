import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { Box } from "@material-ui/core";

import useStyles, { CustomLinearProgress } from "./styles";

export default function StorySlideProgress({
  items = [],
  currentIndex,

  onNext
}) {
  const classes = useStyles({ currentIndex });
  const [currentValue, setCurrentValue] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(null);

  useEffect(() => {
    if (currentInterval) {
      clearInterval(currentInterval);
    }

    setCurrentValue(0);
    const intervalId = setInterval(() => {
      setCurrentValue((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          if (currentIndex < items.length - 1) {
            setTimeout(() => {
              onNext && onNext();
              // TODO: implement progress for video
            }, 500);
          }
          return 100;
        } else {
          return prevProgress + 10;
        }
      });
    }, 100);
    setCurrentInterval(intervalId);
  }, [currentIndex])

  return (
    <Box className={classes.storySlideProgress}>
      {items && items.map((item) => (
        <CustomLinearProgress
          key={item.id}
          className={clsx(item.id !== items[currentIndex].id && classes.customLinerProgress)}
          variant="determinate"
          value={item.id === items[currentIndex].id ? currentValue : 0} />
      ))}
    </Box>
  )
};
