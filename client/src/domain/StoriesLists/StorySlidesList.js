import React, { useState, useEffect, useRef } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box, Typography, IconButton } from "@material-ui/core";

import LeftArrowIcon from '@material-ui/icons/ArrowLeft';
import RightArrowIcon from '@material-ui/icons/ArrowRight';

import { ImagesContent, VideoContent } from "../../components/MediaContent";
import Avatar from "../../components/Avatar";
import { MEDIA_VIDEO } from "../../constants/media_types";
import StorySlideProgress from "./StorySlideProgress";
import useStyles from "./styles";

export default function StorySlidesList({
  open,
  avatarUrl = "",
  username = "",
  items,
  startIndex = 0,
  autoplay = false,

  onClick,
  onSlideChange
}) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [localOpen, setLocalOpen] = useState(open);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex])

  useEffect(() => {
    if (open !== localOpen) {
      setLocalOpen(open);
    }
  }, [open])

  useEffect(() => {
    if (typeof currentIndex === "number" && items[currentIndex]) {
      onSlideChange && onSlideChange(currentIndex, items[currentIndex]);
    }
  }, [currentIndex])

  const renderItem = (item) => {
    if (item.media.kind === MEDIA_VIDEO) {
      return <VideoContent
        wrapperClassName={classes.storySlideVideoWrapper}
        videoClassName={classes.storySlideVideo}
        key={item.id}
        url={item.media.url}
        showControls={false}
        videoPlayerProps={{
          playing: item.id === items[currentIndex].id
        }} />
    }

    return <ImagesContent
      className={classes.storySlideImage}
      wrapperClassName={classes.storySlideImageWrapper}
      key={item.id}
      url={item.media.url} />;
  }

  const renderControls = (localCurrentIndex, localItems) => {
    if (localItems.length < 2) return null;

    return (
      <>
        <IconButton
          className={classes.storiesListControlLeft}
          onClick={() => localCurrentIndex > 0 && setCurrentIndex(localCurrentIndex-1)}>
          <LeftArrowIcon />
        </IconButton>
        <IconButton
          className={classes.storiesListControlRight}
          onClick={() => localItems && localCurrentIndex < localItems.length - 1 && setCurrentIndex(localCurrentIndex+1)}>
          <RightArrowIcon />
        </IconButton>
      </>
    )
  }

  const handleNextSlide = () => {
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <Box className={classes.storiesList}>
      {items.length > 0 && 
        <StorySlideProgress
          items={items}
          currentIndex={currentIndex}
          onNext={handleNextSlide} />
        }
      <Box className={classes.storiesListContent}>
        <Box className={classes.storiesListHeader}>
          <Avatar className={classes.storiesListAvatar} src={avatarUrl} />
          <Typography>{username}</Typography>
        </Box>
        <SwipeableViews
          enableMouseEvents
          className={classes.storiesListSwipeableArea}
          slideClassName={classes.storiesListSwipeableAreaSlide}
          index={currentIndex}
          onChangeIndex={(index) => setCurrentIndex(index)}>
          {items && items.map((item) => renderItem(item))}
        </SwipeableViews>
        {renderControls(currentIndex, items)}
      </Box>
    </Box>
  )
};
