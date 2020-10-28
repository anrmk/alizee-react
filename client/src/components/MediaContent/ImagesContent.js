import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Gallery from '../Gallery';

function renderImage(id, url, altText, lazyLoad) {
  return (
    <LazyLoadImage
      key={id}
      height="100%"
      width="100%"
      effect="blur"
      src={url}
      alt={altText}
      visibleByDefault={!lazyLoad} />
  )
}

function ImagesContent({ thumbnail, items, altText, lazyLoad }) {
  return (
    <Gallery>
      {items.length && items.map(item => {
        const url = thumbnail ? item.thumbnailUrl : item.url;
        return renderImage(item.id, url, altText, lazyLoad)
      })}
    </Gallery>
  )
}

ImagesContent.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.bool,
  items: PropTypes.array,
  altText: PropTypes.string,
  lazyLoad: PropTypes.bool
}

ImagesContent.defaultProps = {
  id: null,
  thumbnail: false,
  items: [],
  altText: "",
  lazyLoad: false
};

export default ImagesContent;
