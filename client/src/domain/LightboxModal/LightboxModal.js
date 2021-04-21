import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";

import Gallery from "../../components/Gallery";
import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";
import { VideoContent } from "../../components/MediaContent";

import useStyles from "./styles";

function LightboxModal({ items, startSlideIndex = 0 }) {
  const classes = useStyles();
  const [currentMediaType, setCurrentMediaType] = useState();

  useEffect(() => {
    if (items.length && items[startSlideIndex]) {
      setCurrentMediaType(items[startSlideIndex].kind);
    }
  }, []);

  const handleChangeIndex = (index) => {
    if (items.length && items[index]) {
      setCurrentMediaType(items[index].kind)
    }
  }

  const isVideo = (type) => {
    return type === MEDIA_VIDEO;
  }
  
  return (
    <Box style={{
      width: !isVideo(currentMediaType) && "100%",
      height: isVideo(currentMediaType) && "100%" }}>
      <Gallery
        isPurchased 
        className={classes.root} 
        style={{ height: isVideo(currentMediaType) && "100%" }} 
        pagination={false} 
        currentIndex={startSlideIndex}
        onChangeIndex={handleChangeIndex}>
        {items.length &&
          items.map((item) => {
            if (item.kind === MEDIA_IMAGE) {
              return <img 
                loading="lazy"
                className={classes.imageContent}
                key={item.id}
                src={item.url} />;
            } else if (item.kind === MEDIA_VIDEO) {
              return <VideoContent className={classes.videoContent} key={item.id} url={item.url} showControls />
            }
            return null;
        })}
      </Gallery>
    </Box>
  );
}

export default LightboxModal;
