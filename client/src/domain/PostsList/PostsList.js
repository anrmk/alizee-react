import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-bootstrap/Modal';

import ShareList from '../SocialList';
import Post from './Post';
import Loader from './Loader';
import EndMessage from './EndMessage';

function PostsList({
  items,
  hasMore,
  onFetchMore,
  onFavoriteClick,
  onCommentsClick,
  onBuyClick,
  onShareClick
}) {
  const [shareData, setShareData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleFetchMore = () => {
    onFetchMore && onFetchMore();
  }
  
  const handleShareBtnClick = (data) => {
    setShareData(data);
    setShowModal(true);
    onShareClick && onShareClick();
  }

  const handleModalHide = () => {
    setShowModal(false);
  }

  return (
    <>
      <Modal
        dialogClassName="post-share-modal"
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        keyboard={false}
        backdrop="static"
        centered
        onHide={handleModalHide}>
        <Modal.Header closeButton>
          <Modal.Title className="h6 ml-auto pl-4">Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShareList {...shareData} />
        </Modal.Body>
      </Modal>
      <InfiniteScroll
        scrollThreshold={1}
        dataLength={items.length}
        next={handleFetchMore}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMessage />}
        on>
          {items.length > 0 && items.map(item => (
            <Post
              key={item?.id}
              id={item?.id}
              userId={item?.user?.id}
              avatarUrl={item?.user?.avatarUrl}
              mediaUrls={item?.media}
              altText={item?.altText}
              description={item?.description}
              username={item?.user?.userName}
              amount={item?.amount}
              commentable={item?.isCommentable}
              onFavoriteClick={onFavoriteClick}
              onCommentsClick={onCommentsClick}
              onBuyClick={onBuyClick}
              onShareClick={handleShareBtnClick} />
          ))}
      </InfiniteScroll>
    </>
  )
}

export default PostsList;