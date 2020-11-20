import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import {Post, Options} from "../../components/Post";
import ShareList from "../SocialList";

import Loader from "./Loader";
import EndMessage from "./EndMessage";

import {Dialog, DialogContent, DialogTitle, DialogActions, Button} from "@material-ui/core/";

function PostsList({items, hasMore, onFetchMore, onGoToClick, onFollowClick, onFavoriteClick, onBuyClick}) {
  const [optionData, setOptionData] = useState({});
  const [showOptionsModal, setOptionsShowModal] = useState(false);

  const [shareData, setShareData] = useState({});
  const [showShareModal, setShareShowModal] = useState(false);

  const handleFetchMore = () => {
    onFetchMore && onFetchMore();
  }

  const handleShareBtnClick = (data) => {
    setShareData(data);
    setShareShowModal(true);
  }

  const handleOptionBtnClick = (data) => {
    setOptionData(data);
    setOptionsShowModal(true);
  }

  const handleModalHide = () => {
    setShareShowModal(false);
    setOptionsShowModal(false);
  }

  const handleShareClick = (data) => {
    setShareData(data);
    setOptionsShowModal(false);
    setShareShowModal(true);
  }

  return (
    <>
      <Dialog
        open={showShareModal}
        onClose={handleModalHide}
        fullWidth
        aria-labelledby="shared-dialog-title" >
        <DialogTitle id="shared-dialog-title">Share</DialogTitle>
        <DialogContent>
          <ShareList {...shareData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalHide}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showOptionsModal}
        onClose={handleModalHide}
        fullWidth
        aria-labelledby="option-dialog-title" >
        <DialogTitle id="option-dialog-title">Share</DialogTitle>
        <DialogContent>
          <Options {...optionData} onGoToClick={onGoToClick} onFollowClick={onFollowClick} onShareClick={handleShareClick} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalHide}>Close</Button>
        </DialogActions>
      </Dialog>

      <InfiniteScroll
        scrollThreshold={1}
        dataLength={items.length}
        next={handleFetchMore}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMessage />}>
          {items.length > 0 && items.map(item => (
            <Post
              key={item?.id}
              id={item?.id}
              userId={item?.user?.id}
              avatarUrl={item?.user?.avatarUrl}
              mediaUrls={item?.media}
              description={item?.description}
              username={item?.user?.userName}
              createdDate={item?.createdDate}
              amount={item?.amount}
              commentable={item?.isCommentable}
              likes={item?.likes}
              iLike={item?.iLike}
              onGoToClick={onGoToClick}
              onFavoriteClick={onFavoriteClick}
              onBuyClick={onBuyClick}
              onShareClick={handleShareBtnClick} 
              onOptionsClick={handleOptionBtnClick} />
          ))}
      </InfiniteScroll>
    </>
  )
}

export default PostsList;