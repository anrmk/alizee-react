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
    <div className="col-4" onClick={onClick}>
      <CustomLink as="figure" to={`${POST_ROUTE}/${id}`} className="figure tile" style={{ cursor: "pointer" }}>
        {media.length > 0  
        ?
         <MediaContent thumbnail items={media} caption={caption} amount={amount} lazyLoad />
        :
        <div>{caption}</div>
      }
      </CustomLink>
    </div>
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
