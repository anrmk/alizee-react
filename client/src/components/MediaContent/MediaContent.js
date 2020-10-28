import React from "react";
import PropTypes from "prop-types";

import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";
import ImagesContent from "./ImagesContent";
import VideoContent from "./VideoContent";
import PayableContent from "./PayableContent";

function MediaContent({ 
  items,
  thumbnail,
  caption,
  amount,
  lazyLoad,
  showPayable
}) {
  if (!showPayable && amount > 0) return <PayableContent amount={amount} />;

  if (!items || !items.length) return null;

  if (items.length === 1) {
    switch(items[0].kind) {
      case MEDIA_IMAGE:
        return <ImagesContent thumbnail={thumbnail} items={items} altText={caption} lazyLoad={lazyLoad} />;
      case MEDIA_VIDEO:
        return <VideoContent url={items[0].url} />;
    }
  }

  return <ImagesContent items={items} />;
}

MediaContent.propTypes = {
  items: PropTypes.array,
  thumbnail: PropTypes.bool,
  caption: PropTypes.string,
  amount: PropTypes.number,
  lazyLoad: PropTypes.bool,
  showPayable: PropTypes.bool
}

MediaContent.defaultProps = {
  items: [],
  thumbnail: false,
  caption: "",
  amount: 0,
  lazyLoad: true,
  showPayable: false
};

export default MediaContent;
