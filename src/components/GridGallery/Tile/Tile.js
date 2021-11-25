import React from "react";
import PropTypes from "prop-types";

import VideoLibraryIcon from "@material-ui/icons/VideoLibraryOutlined";
import CustomLink from "../../CustomLink";
import MediaContent from "../../MediaContent";
import { POST_ID_ROUTE } from "../../../constants/routes";

import "./GridGallery.scss";

const Tile = ({ id, media, caption, amount, onClick }) => {
  return (
    <div className="col-4" onClick={onClick}>
      <CustomLink
        as="a"
        to={POST_ID_ROUTE(id)}
        className={`tile ${media.length > 0 ? "" : "tile-text"}`}>
        <div className="tile-icon">
          <VideoLibraryIcon />
        </div>
        <div className="tile-container">
          {media.length > 0 ? (
            <MediaContent
              thumbnail
              items={media}
              caption={caption}
              amount={amount}
              lazyLoad
            />
          ) : (
            <>{caption}</>
          )}
        </div>
      </CustomLink>
    </div>
  );
}

Tile.propTypes = {
  id: PropTypes.string,
  media: PropTypes.array,
  caption: PropTypes.string,
  amount: PropTypes.number,
  onClick: PropTypes.func,
};

Tile.defaultProps = {
  id: null,
  media: [],
  caption: "",
  amount: 0,
  onClick: undefined,
};

export default Tile;