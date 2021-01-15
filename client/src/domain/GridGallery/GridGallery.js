import React, { useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { GridList, GridListTile, GridListTileBar, Hidden, Typography, IconButton, withWidth } from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibraryOutlined";

import useStyle from "./styles";

function GridGallery(props) {
  const { items, hasMore, width } = props;
  const { onFetchMore, onItemClick } = props;

  const classes = useStyle();
  const [isLoading, setLoading] = useState(true);

  return (
    <InfiniteScroll
      className={classes.root}
      dataLength={items.length}
      next={onFetchMore}
      hasMore={hasMore}
      endMessage="The end!"
      loader="Loading..."
    >
      {!items || items.length == 0 ? (
        <Typography className={classes.defaultLabel}>Start capturing and sharing your moments.</Typography>
      ) : (
        <GridList spacing={12} cols={3} className={classes.gridList}>
        {/* <GridList spacing={12} cols={["lg", "xl"].includes(width) ? 4 : 3} className={classes.gridList}> */}
          {items &&
            items.map(
              (item, index) =>
                item.media.length > 0 && (
                  <GridListTile
                    key={item.id + index}
                    onClick={() => onItemClick(item.id)}
                    className={classes.gridListTile}
                  >
                    <LazyLoadImage
                      effect="blur"
                      src={item.media[0].kind === 1 ? item.media[0].thumbnailUrl : item.media[0].url}
                      alt={item.title}
                      className={classes.gridListTileImage}
                      afterLoad={() => setLoading(false)}
                    />

                    {!isLoading && (<Hidden smDown>
                        <GridListTileBar
                          titlePosition="top"
                          actionPosition="right"
                          className={classes.gridListTileBar}
                          actionIcon={
                            <IconButton aria-label={`star ${item.caption}`} className={classes.icon}>
                              {item.media[0].kind === 1 ? <PlayArrowIcon /> : <PhotoLibraryIcon />}
                            </IconButton>
                          }
                        />
                      </Hidden> )}
                  </GridListTile>
                )
            )}
        </GridList>
      )}
    </InfiniteScroll>
  );
}

GridGallery.propTypes = {
  items: PropTypes.array,
  hasMore: PropTypes.bool,
  width: PropTypes.string,

  onFetchMore: PropTypes.func,
  onItemClick: PropTypes.func,
};

GridGallery.defaultProps = {
  items: [],
  hasMore: false,
  width: "",

  onFetchMore: undefined,
  onItemClick: undefined,
};

export default withWidth()(GridGallery);
