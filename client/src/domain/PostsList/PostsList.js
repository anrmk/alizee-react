import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "../../components/Post";

const PostsList = React.memo(
  ({
    user,
    items,
    hasMore,

    onCommentSend,
    onFetchMore,
    onFullScreen,

    onLike,
    onFavorite,
    onSendTip,
    onBuyPost,
    onReceipt,
    onPurchase,
    onShare,
    onMenu
  }) => {
    return (
      <InfiniteScroll scrollThreshold={1} dataLength={items.length} next={onFetchMore} hasMore={hasMore}>
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
              onLike={onLike}
              onFavorite={onFavorite}
              onSendTip={onSendTip}
              onBuyPost={onBuyPost}
              onReceipt={onReceipt}
              onPurchase={onPurchase}
              onMenu={onMenu}
              onShare={onShare}
              onCommentSend={onCommentSend}
              onFullScreen={onFullScreen}
            />
          ))}
      </InfiniteScroll>
    );
  }
);

export default PostsList;
