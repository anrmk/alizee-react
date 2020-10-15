import React from 'react'
import { Link } from "react-router-dom";

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

import ImagesContent from './ImagesContent';
import VideoContent from './VideoContent';
import PayableContent from './PayableContent';
import { MEDIA_IMAGE, MEDIA_VIDEO } from '../../constants/media_types';
import { Avatar } from '../../components/Avatar';

import './Post.scss';

function Post({ 
  id,
  userId,
  avatarUrl,
  username,
  altText,
  mediaUrls,
  amount,
  description,
  commentable = false,
  onFavoriteClick,
  onCommentsClick,
  onBuyClick,
  onShareClick
}) {
  const handleFavoriteBtnClick = () => {
    onFavoriteClick && onFavoriteClick();
  }

  const handleCommentsBtnClick = () => {
    onCommentsClick && onCommentsClick();
  }

  const handleBuyBtnClick = () => {
    onBuyClick && onBuyClick();
  }

  const handleShareBtnClick = () => {
    const data = { id, title: username, quote: description };

    onShareClick && onShareClick(data);
  }

  const renderContent = (items, altText, amount) => {
    if (amount > 0) return <PayableContent amount={amount} />;

    if (!items || !items.length) return <p>Media not found</p>

    if (items.length === 1) {
      switch(items[0].kind) {
        case MEDIA_IMAGE:
          return <ImagesContent items={items} altText={altText} />;
        case MEDIA_VIDEO:
          return <VideoContent url={items[0].url} />;
      }
    }

    return <ImagesContent items={items} />;
  }

  return (
    <div className="card mb-5" key={id}>
      <Link to={`/users/${userId}`} as="div">
        <div className="card-header d-flex align-items-center">
          <Avatar url={avatarUrl} size="large" />
          <p className="username mb-0 ml-3 font-weight-bold">{username}</p>
        </div>
      </Link>
      <div className="card-content-wrapper">
        {renderContent(mediaUrls, altText, amount)}
      </div>
      <div className="card-body">
        <p>{description}</p>
        <FavoriteBorderIcon className="mr-3" fontSize="large" />
        {commentable && <ChatBubbleOutlineOutlinedIcon className="mr-3" fontSize="large"/>}
        <ShareOutlinedIcon className="mr-3" fontSize="large" onClick={handleShareBtnClick} />
        <MonetizationOnOutlinedIcon className="mr-3" fontSize="large"/>
      </div>
    </div>
  )
}

export default Post;