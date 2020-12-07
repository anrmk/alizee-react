import React from "react";
import PropTypes from "prop-types";

import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";
import ImagesContent from "./ImagesContent";
import VideoContent from "./VideoContent";
import PayableContent from "./PayableContent";

import Gallery from "../Gallery";

import { Grid } from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";

const handleLockBtnClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const handlePayBtnClick = (e) => {
  e.preventDefault();

  console.log("pay click");
};

const renderContent = () => {};

function MediaContent({ items, amount, showThumbnail, showPayable, className }) {
  if (!items || !items.length) return <></>;

  return (
    <Gallery className={className} amount={amount} onPayClick={handlePayBtnClick}>
      {items.length &&
        items.map((item) => {
          const url = showThumbnail ? item.thumbnailUrl : item.url;
          if (item.kind === MEDIA_IMAGE || !amount) {
            return <ImagesContent key={item.id} url={url} amount={amount} />;
          } else if (item.kind === MEDIA_VIDEO) {
            return <VideoContent key={item.id} url={url} />;
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
  //lazyLoad: PropTypes.bool,
  showPayable: PropTypes.bool,
  showThumbnail: PropTypes.bool,
};

MediaContent.defaultProps = {
  items: [],
  caption: "",
  amount: 0,
  //lazyLoad: true,
  showPayable: false,
  showThumbnail: false,
};

export default MediaContent;
