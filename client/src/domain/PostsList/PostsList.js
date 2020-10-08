import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from './Post';
import Loader from './Loader';
import EndMessage from './EndMessage';

function PostsList({
  items,
  onFetchMore,
  onFavoriteClick,
  onCommentsClick,
  onBuyClick,
  onShareClick
}) {
  const handleFetchMore = () => {
    onFetchMore && onFetchMore();
  }

  return (
    <InfiniteScroll
      scrollThreshold={1}
      dataLength={items.length}
      next={handleFetchMore}
      hasMore={true}
      loader={<Loader />}
      endMessage={<EndMessage />}>
        {items.length && items.map(item => (
          <Post
            key={item?.id}
            id={item?.id}
            mediaUrls={item?.media}
            altText={item?.altText}
            description={item?.description}
            onFavoriteClick={onFavoriteClick}
            onCommentsClick={onCommentsClick}
            onBuyClick={onBuyClick}
            onShareClick={onShareClick} />
        ))}
  </InfiniteScroll>
  )
}

export default PostsList;