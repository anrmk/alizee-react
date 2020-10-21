import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function renderImage(id, url, altText) {
  return (
    <div key={id}>
      <img style={{ objectFit: 'cover' }} src={url} alt={altText} />
    </div>
  )
}

export default function ImagesContent({ items, altText }) {
  return (
    <Carousel
      showThumbs={false}
      swipeable
      emulateTouch>
      {items.length && items.map(item => renderImage(item.id, item.url, altText))}
    </Carousel>
  )
}