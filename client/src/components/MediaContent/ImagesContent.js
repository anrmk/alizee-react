import React from "react";
import PropTypes from "prop-types";

import Gallery from "../Gallery";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import useStyles from "./styles";

function renderImage(id, url, altText, className, lazyLoad) {
  return (
    <LazyLoadImage key={id} className={className} effect="blur" src={url} alt={altText} visibleByDefault={!lazyLoad} />
  );
}

function ImagesContent({ thumbnail, items, altText, lazyLoad }) {
  const classes = useStyles();

  return (
    <Gallery>
      {items.length &&
        items.map((item) => {
          const url = thumbnail ? item.thumbnailUrl : item.url;
          return renderImage(item.id, url, altText, classes.image, lazyLoad);
        })}
    </Gallery>
  );
}

ImagesContent.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.bool,
  items: PropTypes.array,
  altText: PropTypes.string,
  lazyLoad: PropTypes.bool,
};

ImagesContent.defaultProps = {
  id: null,
  thumbnail: false,
  items: [],
  altText: "",
  lazyLoad: false,
};

export default ImagesContent;
