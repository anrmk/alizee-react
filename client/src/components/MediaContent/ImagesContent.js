import React, { useState } from "react";
import PropTypes from "prop-types";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ImagesContent({ id, url, altText, lazyLoad }) {
  return <LazyLoadImage id={id} effect="blur" src={url} alt={altText} visibleByDefault={!lazyLoad} />;
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
  lazyLoad: true,
};

export default ImagesContent;
