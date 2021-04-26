import React, { useState } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { GridList, GridListTile, GridListTileBar, Hidden, Box } from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibraryOutlined";

import useStyle from "./styles";
import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";

function GridGalleryPostList(props) {
  const { items } = props;
  const { onItemClick } = props;

  const classes = useStyle();
  const [isLoading, setLoading] = useState(true);

  return (
    <GridList spacing={12} cols={3} className={classes.gridList}>
      {items &&
        items.map(
          (item, index) =>
            item.media.length > 0 && (
              <GridListTile
                key={item.id + index}
                onClick={() => onItemClick(item.id)}
                className={classes.gridListTile}>
                <img
                  className={classes.gridListTileImage}
                  loading="lazy"
                  src={item.media[0].thumbnailUrl}
                  alt={item.title} />
                {/* <LazyLoadImage
                  className={classes.gridListTileImage}
                  effect={item && "blur"}
                  src={item.media[0].kind === MEDIA_VIDEO ? item.media[0].thumbnailUrl : item.media[0].url}
                  alt={item.title}
                  afterLoad={() => setLoading(false)} /> */}
                {!isLoading && (
                  <Hidden smDown>
                    <GridListTileBar
                      titlePosition="top"
                      actionPosition="right"
                      classes={{
                        root: classes.gridListTileBar,
                      }}
                      actionIcon={
                        <Box className={classes.icon}>
                          {item.media[0].kind === MEDIA_VIDEO && <PlayArrowIcon />}
                          {item.media.length > 1 && item.media[0].kind === MEDIA_IMAGE && <PhotoLibraryIcon />}
                        </Box>
                      }
                    />
                  </Hidden>
                )}
              </GridListTile>
            )
        )}
    </GridList>
  );
}

GridGalleryPostList.propTypes = {
  item: PropTypes.object,
  isUserView: PropTypes.bool,

  onItemClick: PropTypes.func,
};

GridGalleryPostList.defaultProps = {
  item: {},
  isUserView: false,

  onItemClick: undefined,
};

export default GridGalleryPostList;
