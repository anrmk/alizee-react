import React from 'react'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

import './Post.scss';
import { MEDIA_IMAGE, MEDIA_VIDEO } from '../../constants/media_types';
import Avatar from '../../components/Avatar';
import ImagesContent from './ImagesContent';
import VideoContent from './VideoContent';

function Post({ 
  id,
  altText,
  mediaUrls,
  description,
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
    onShareClick && onShareClick();
  }

  const renderContent = (items, altText) => {
    if (!items.length) return <p>Media not found</p>

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

  // TODO: remove hardcore url
  return (
    <div className="card mb-5" key={id}>
      <div className="card-header">
        <Avatar url="https://www.w3schools.com/bootstrap4/newyork.jpg" size="large" />
      </div>
      <div className="card-content-wrapper">
        {renderContent(mediaUrls, altText)}
      </div>
      <div className="card-body">
        <p>{description}</p>
        <FavoriteBorderIcon className="mr-3" fontSize="large" />
        <ChatBubbleOutlineOutlinedIcon className="mr-3" fontSize="large"/>
        <ShareOutlinedIcon className="mr-3" fontSize="large"/>
        <MonetizationOnOutlinedIcon className="mr-3" fontSize="large"/>
      </div>
    </div>
  )
}

export default Post;