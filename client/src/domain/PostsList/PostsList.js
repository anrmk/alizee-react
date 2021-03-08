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
  onShareToChatClick,
  onSendTip,
  onBuyPost,
  onReceipt,
  onPurchase,

  onLike,
  onFavorite,
  onMenu,
  onShare
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
            key={`post-${item.id}`}
            id={item.id}
            user={user}
            owner={item.user}
            post={item}
            likes={item.likes}
            isLike={item.iLike}
            isFavorite={item.isFavorite}

            onFollow={onFollow}
            onUnfollow={onUnfollow}
            onBlock={onBlock}
            onUnblock={onUnblock}
            onReport={onReport}
            onShareToChatClick={onShareToChatClick}

            onLike={onLike}
            onFavorite={onFavorite}
            onSendTip={onSendTip}
            onBuyPost={onBuyPost}
            onReceipt={onReceipt}
            onPurchase={onPurchase}
            onMenu={onMenu}
            onShare={onShare} />
        ))}
    </InfiniteScroll>
  );
})

export default PostsList;
