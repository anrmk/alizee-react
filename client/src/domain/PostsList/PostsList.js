import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import {Post, Options} from "../../components/Post";
import ShareList from "../SocialList";

import Loader from "./Loader";
import EndMessage from "./EndMessage";

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
      {/* <Modal dialogClassName="post-share-modal" show={showShareModal} aria-labelledby="contained-modal-title-vcenter" keyboard={false} backdrop="static" centered onHide={handleModalHide}>
        <Modal.Header closeButton>
          <Modal.Title className="h6 ml-auto pl-4">Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShareList {...shareData} />
        </Modal.Body>
      </Modal>

      <Modal show={showOptionsModal} aria-labelledby="container-modal-title-vcenter" keyboard={false} backdrop="static" centered onHide={handleModalHide} >
        <Modal.Header closeButton>
          <Modal.Title className="h6 ml-auto pl-4">Options</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Options {...optionData} onGoToClick={onGoToClick} onFollowClick={onFollowClick} onShareClick={handleShareClick} />
        </Modal.Body>
      </Modal> */}

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