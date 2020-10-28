import React from "react";
import PropTypes from 'prop-types';

import CustomLink from "../../components/CustomLink";
import MediaContent from "../../components/MediaContent";
import { POST_ROUTE } from "../../constants/routes";

import "./GridGallery.scss";

function Tile({ 
  id,
  media,
  caption,
  amount,

  onClick
}) {
  return (
    <figure className="col-sm-4 tile" onClick={onClick}>
      <CustomLink as="div" to={`${POST_ROUTE}/${id}`} style={{ cursor: "pointer" }}>
        <MediaContent thumbnail items={media} caption={caption} amount={amount} lazyLoad />
      </CustomLink>
    </figure>
  );
}

Tile.propTypes = {
  id: PropTypes.string,
  media: PropTypes.array,
  caption: PropTypes.string,
  amount: PropTypes.number,

  onClick: PropTypes.func
}

Tile.defaultProps = {
  id: null,
  media: [],
  caption: "",
  amount: 0,

  onClick: undefined
};

export default Tile;
