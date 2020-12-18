import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { Post, Payment, Receipt } from "../../components/Post";
import SocialList from "../SocialList";

import Loader from "./Loader";
import EndMessage from "./EndMessage";

import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@material-ui/core";

function PostsList({
  items, 
  hasMore, 
  
  onFetchMore, 
  onGoToClick, 
  onFollowClick,
  onLikeClick, 
  onFavoriteClick, 
  onPayClick}) {
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleFetchMore = () => {
    onFetchMore && onFetchMore();
  };

  const handlePayClick = () => {
    onPayClick && onPayClick({ ...modalData.data });

    handleModalHide();
  };

  const handleShareClick = (data) => {
    setModalData({ contentType: "share", title: "Share post", data, content: <SocialList {...data} /> });
    setShowModal(true);
  };

  const handlePaymentClick = (data) => {
    setModalData({ contentType: "payment", title: "Payment", data, content: <Payment {...data} /> });
    setShowModal(true);
  };

  const handleReceiptClick = (data) => {
    setModalData({ contentType: "receipt", title: "Receipt", data, content: <Receipt {...data} /> });
    setShowModal(true);
  };

  const handleModalHide = () => {
    setShowModal(false);
  };

  return (
    <>
      <Dialog open={showModal} onClose={handleModalHide} fullWidth aria-labelledby="post-dialog-title">
        <DialogTitle id="post-dialog-title">{modalData.title}</DialogTitle>
        <DialogContent>{modalData.content}</DialogContent>
        <DialogActions>
          {modalData.contentType === "payment" && (
            <Button color="primary" onClick={handlePayClick}>
              Pay
            </Button>
          )}
          <Button onClick={handleModalHide}>Close</Button>
        </DialogActions>
      </Dialog>

      <InfiniteScroll
        scrollThreshold={1}
        dataLength={items.length}
        next={handleFetchMore}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >
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
              onPayClick={handlePaymentClick}
              onReceiptClick={handleReceiptClick}
              onShareClick={handleShareClick}
            />
          ))}
      </InfiniteScroll>
    </>
  );
}

export default PostsList;
