import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import { Box, Button, Typography } from "@material-ui/core";

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
    onMenu,
    onClick,
  }) => {
    // const scroll = useWindowScrollPosition(items,);

    useEffect(() => {
      //   scroll();
    }, []);
    return (
      <>
        {/* <Box width="100%">
			  <Button style={{ width: "100%" }} disableElevation color="primary" variant="contained" onClick={onRefresh}>See new Posts</Button>
			</Box> */}
        <InfiniteScroll
          scrollThreshold={1}
          dataLength={items.length}
          next={onFetchMore}
          hasMore={hasMore}>
          {items.length > 0 &&
            items.map((item) => (
              <Post
                key={`post-${item.id}`}
                id={item.id}
                user={user}
                owner={item.user}
                post={item}
                comments={item.comments}
                likes={item.likes}
                isLike={item.iLike}
                isTargetFunds={item.isTargetFunds}
                isFavorite={item.isFavorite}
                isUserFavorite={item.user?.isFavorite}
                onLike={onLike}
                onFavorite={onFavorite}
                // TODO: doesn't optimized, after send tip happens all posts rerenders
                onSendTip={onSendTip}
                onBuyPost={onBuyPost}
                onReceipt={onReceipt}
                onPurchase={onPurchase}
                onMenu={onMenu}
                onShare={onShare}
                onCommentSend={onCommentSend}
                onFullScreen={onFullScreen}
                onClick={onClick}
              />
            ))}
        </InfiniteScroll>
      </>
    );
  }
);

export default PostsList;
