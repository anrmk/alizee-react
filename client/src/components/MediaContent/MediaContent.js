import React from "react";
import PropTypes from "prop-types";

import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";
import ImagesContent from "./ImagesContent";
import VideoContent from "./VideoContent";

import Gallery from "../Gallery";

function MediaContent({
  items,
  amount,
  isPurchased,
  showThumbnail,

  onPayClick,
}) {
  if (!items || !items.length) return <></>;

  return (
    <Gallery amount={amount} isPurchased={isPurchased} onPayClick={onPayClick} >
      {items.length &&
        items.map((item) => {
          const url = showThumbnail ? item.thumbnailUrl : item.url;

          if (item.kind === MEDIA_IMAGE) {
            return <ImagesContent key={item.id} url={url} amount={amount} />;
          } else if (item.kind === MEDIA_VIDEO) {
            return <VideoContent key={item.id} url={url} showControls={amount === 0} />;
          } else {
            return <></>;
          }
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
