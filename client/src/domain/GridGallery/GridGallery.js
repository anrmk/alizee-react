import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import { Typography, IconButton } from "@material-ui/core";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

import StarBorderIcon from "@material-ui/icons/StarBorderOutlined";

import useStyles from "./styles";

function GridGallery({
  items,
  hasMore,

  onFetchMore,
  onItemClick,
}) {
  const classes = useStyles();

  return (
    <InfiniteScroll
      className={classes.root}
      scrollThreshold={1}
      dataLength={items.length}
      next={onFetchMore}
      hasMore={hasMore}
    >
      {!items || items.length == 0 ? <div>Start capturing and sharing your moments.</div> : 
      <GridList
      cellHeight="auto"
      spacing={12}
      cols={4}
      className={classes.gridList}
    >
      {items && items.length > 0 && items.map((item, index) => (
          <GridListTile key={item?.id} onClick={() => onItemClick(item?.id)} className={classes.gridListTile}>
            {item.media.length > 0 ? (
              <img src={item?.media[0]?.thumbnailUrl} alt={item.title} />
            ) : (
              <Typography className={classes.typography}>
                {item.caption}
              </Typography>
            )}
            <GridListTileBar
              titlePosition="top"
              actionPosition="right"
              className={classes.gridListTileBar}
              actionIcon={
                <IconButton
                  aria-label={`star ${item.caption}`}
                  className={classes.icon}
                >
                  <StarBorderIcon />{" "}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
    </GridList>}
      
    </InfiniteScroll>
  );
}

GridGallery.propTypes = {
  items: PropTypes.array,
  hasMore: PropTypes.bool,

  onFetchMore: PropTypes.func,
  onItemClick: PropTypes.func,
};

GridGallery.defaultProps = {
  items: [],
  hasMore: false,

  onFetchMore: undefined,
  onItemClick: undefined,
};

export default GridGallery;
