import React from "react";
import PropTypes from "prop-types";

import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";
import ImagesContent from "./ImagesContent";
import VideoContent from "./VideoContent";

import Gallery from "../Gallery";

import useStyles from "./styles";

function MediaContent({
  items,
  amount,
  isOwner,
  isPurchased,

  onPayClick,
}) {
  const classes = useStyles();

  if (!items || !items.length) return <></>;

  return (
    <Gallery className={classes.root} amount={amount} isPurchased={isPurchased} onPayClick={onPayClick} >
      {items.length &&
        items.map((item) => {
          if ((item.kind === MEDIA_IMAGE) || (!isPurchased && !isOwner && amount > 0)) {
            return <ImagesContent className={classes.mediaContent} wrapperClassName={classes.imageContentWrapper} key={item.id} url={item.thumbnailUrl} amount={amount} />;
          } else if (item.kind === MEDIA_VIDEO) {
            return <VideoContent className={classes.mediaContent} key={item.id} url={item.url} showControls={amount === 0 || isPurchased} />
          }

          return null;
        })}
    </Gallery>
  );
}

MediaContent.propTypes = {
  items: PropTypes.array,
  caption: PropTypes.string,
  amount: PropTypes.number,
  isPurchased: PropTypes.bool,
 
  showPayable: PropTypes.bool,
  showThumbnail: PropTypes.bool,

  onPayClick: PropTypes.func
};

MediaContent.defaultProps = {
  items: [],
  caption: "",
  amount: 0,
  isPurchased: false,

  showPayable: false,
  showThumbnail: false,

  onPayClick: undefined
};

export default MediaContent;
