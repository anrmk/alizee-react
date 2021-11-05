import React from "react";
import PropTypes from "prop-types";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import skeleton from "../../assets/img/skeleton.png";

function ImagesContent({
  id,
  url,
  altText,
  className,
  wrapperClassName,
  isLoaded = true,

  onLoaded,
}) {
  return (
    <LazyLoadImage
      className={className}
      wrapperClassName={wrapperClassName}
      id={id}
      effect="blur"
      src={isLoaded ? url : skeleton}
      alt={altText}
      visibleByDefault
      afterLoad={() => {
        onLoaded && onLoaded();
      }}
    />
  );
}

ImagesContent.propTypes = {
  id: PropTypes.string,
  altText: PropTypes.string,
};

ImagesContent.defaultProps = {
  id: null,
  altText: "",
};

export default ImagesContent;
