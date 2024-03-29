import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Typography } from "@material-ui/core";

import GridGalleryUserList from "./GridGalleryUserList";
import GridGalleryPostList from "./GridGalleryPostList";

import useStyle from "./styles";

function GridGallery(props) {
  const { isUserView, items, hasMore } = props;
  const { onFetchMore, onItemClick } = props;
  const classes = useStyle();

  return (
     !items || !items.length ?
      !isUserView && <Typography className={classes.defaultLabel}>Start capturing and sharing your moments.</Typography>
      : <InfiniteScroll
          className={classes.root}
          dataLength={items.length}
          next={onFetchMore}
          hasMore={hasMore}>
          {isUserView ?
            <GridGalleryUserList items={items} onItemClick={onItemClick} /> : 
            <GridGalleryPostList items={items} onItemClick={onItemClick} />}
      </InfiniteScroll>
  );
}

export default GridGallery;
