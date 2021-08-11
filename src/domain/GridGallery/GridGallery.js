import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import GridGalleryUserList from "./GridGalleryUserList";
import GridGalleryPostList from "./GridGalleryPostList";
import GridGalleryStub from "./GridGalleryStub";

import useStyle from "./styles";

function GridGallery({
  isStubShow,
  isUserView,
  items,
  hasMore,

  onFetchMore,
  onItemClick,
  onSubscribeClick,
}) {
  const classes = useStyle();

  if (isStubShow)
    return <GridGalleryStub onSubscribeClick={onSubscribeClick} />;

  return (
    items &&
    !!items.length && (
      <InfiniteScroll
        className={classes.root}
        dataLength={items.length}
        next={onFetchMore}
        hasMore={hasMore}>
        {isUserView ? (
          <GridGalleryUserList items={items} onItemClick={onItemClick} />
        ) : (
          <GridGalleryPostList items={items} onItemClick={onItemClick} />
        )}
      </InfiniteScroll>
    )
  );
}

export default GridGallery;
