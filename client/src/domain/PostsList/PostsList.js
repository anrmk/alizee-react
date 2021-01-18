import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import usePostDialog from "../../hooks/usePostDialog";
import { Post } from "../../components/Post";

import Loader from "./Loader";
import EndMessage from "./EndMessage";

const PostsList = React.memo(({
  items,
  hasMore,

  onFetchMore,
  onGoToClick,
  onFollowClick,
  onLikeClick,
  onFavoriteClick,
  onPayClick,
}) => {
  const postDialog = usePostDialog({ onPayClick });

  const handleDialogToggle = (data, type) => {
    postDialog.toggleDialog(type, true, data)
  };

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
            key={item?.id}
            id={item?.id}
            userId={item?.user?.id}
            avatarUrl={item?.user?.avatarUrl}
            mediaUrls={item?.media}
            description={item?.description}
            name={item?.user?.name}
            username={item?.user?.userName}
            createdDate={item?.createdDate}
            amount={item?.amount}
            isCommentable={item?.isCommentable}
            likes={item?.likes}
            iLike={item?.iLike}
            isFavorite={item?.isFavorite}
            isPurchased={item?.isPurchased}
            onGoToClick={onGoToClick}
            onLikeClick={onLikeClick}
            onFavoriteClick={onFavoriteClick}
            onDialogToggle={handleDialogToggle} />
        ))}
    </InfiniteScroll>
  );
})

export default PostsList;
