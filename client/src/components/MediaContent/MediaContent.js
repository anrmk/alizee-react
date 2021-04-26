import React, { useState } from "react";

import { Box, Fade } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";

import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";
import ImagesContent from "./ImagesContent";
import VideoContent from "./VideoContent";

import Gallery from "../Gallery";

import useStyles from "./styles";

function MediaContent({
  id,
  user,
  items,
  amount,
  isOwner,
  isPurchased,
  showThumbnail,
  isLiked = false,

  onPayClick,
  onChangeIndex,
  onClick
}) {
  const classes = useStyles();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handlePayPostClick = () => {
    onPayClick && onPayClick({ id, amount, user });
  };
  
  const handleClick = () => {
    onClick && onClick({ post: { media: items }, startSlideIndex: currentSlideIndex });
  }

  const handleChangeSlideIndex = (index) => {
    if (items[index]) {
      setCurrentSlideIndex(index);
    }
    onChangeIndex && onChangeIndex(index);
  }

  if (!items || !items.length) return <></>;

  return (
    <Box onClick={handleClick} position="relative" height="100%">
      <Fade in={isLiked}>
        <FavoriteIcon className={classes.favoriteIcon} />
      </Fade>
      <Gallery className={classes.root} amount={amount} isPurchased={isPurchased} onPayClick={handlePayPostClick} onChangeIndex={handleChangeSlideIndex}>
        {items.length &&
          items.map((item) => {
            if ((item.kind === MEDIA_IMAGE) || (!isPurchased && !isOwner && amount > 0)) {
              const url = showThumbnail ? item.thumbnailUrl : item.url;
              return <ImagesContent className={classes.mediaContent} wrapperClassName={classes.imageContentWrapper} key={item.id} url={url} />;
            } else if (item.kind === MEDIA_VIDEO) {
              return <VideoContent className={classes.mediaContent} key={item.id} url={item.url} showControls={amount === 0 || isPurchased} />
            }
            return null;
          })}
      </Gallery>
    </Box>
  );
}

export default MediaContent;
