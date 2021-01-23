import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";


import { Post } from "../../components/Post";

import Loader from "./Loader";
import EndMessage from "./EndMessage";

const PostsList = React.memo(({
  user,
  items,
  hasMore,

  onFetchMore,

  onFollow,
  onUnfollow,
  onBlock,
  onUnblock,
  onReport,

  onLike,
  onFavorite,
  onDialogToggle
}) => {
  return (
    <InfiniteScroll
      scrollThreshold={1}
      dataLength={items.length}
      next={onFetchMore}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<EndMessage />}>
      {items.length > 0 &&
        items.map((item) => (
          <Post
            key={item.id}
            id={item.id}
            user={user}
            owner={item.user}
            post={item}

            onFollow={onFollow}
            onUnfollow={onUnfollow}
            onBlock={onBlock}
            onUnblock={onUnblock}
            onReport={onReport}

            onLike={onLike}
            onFavorite={onFavorite}
            onDialogToggle={onDialogToggle} />
        ))}
    </InfiniteScroll>
  );
})

export default PostsList;
