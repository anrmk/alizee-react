import React from "react";

import MoreHorizIcon from "@material-ui/icons/MoreHorizOutlined";
import { Link } from "react-router-dom";

import ImagesContent from "./ImagesContent";
import VideoContent from "./VideoContent";
import PayableContent from "./PayableContent";

import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";
import { AvatarItem } from "../../components/Avatar";
import { Tools } from "../../components/Post";

import "./Post.scss";

function Post({id, userId, avatarUrl, username, createdDate, altText, mediaUrls, amount, description, commentable = false, hideToolbar = false, hideHeader = false, onFavoriteClick, onBuyClick, onShareClick}) {
  const handleOnFavoriteClick = () => {
    onFavoriteClick && onFavoriteClick();
  }

  const handleOnBuyClick = () => {
    onBuyClick && onBuyClick();
  }

  const handleOnShareClick = () => {
    const data = { id, title: username, quote: description };

    onShareClick && onShareClick(data);
  }

  const renderContent = (items, altText, amount) => {
    if (amount > 0) return <PayableContent amount={amount} />;

    if (!items || !items.length) return <p></p>

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
      { !hideHeader &&
        <div className="card-header d-flex align-items-center justify-content-between py-2">
          <Link to={`/users/${userId}`}>
            <AvatarItem url={avatarUrl} title={username} subtitle={createdDate ?? ""} />
          </Link>
          <MoreHorizIcon />
        </div>
      }
      
      <div className="card-content-wrapper">
        {renderContent(mediaUrls, altText, amount)}
      </div>
      
      { !hideToolbar && 
        <Tools userId={userId} id={id} commentable={commentable} onShareClick={handleOnShareClick} onFavoriteClick={handleOnFavoriteClick} onBuyClick={handleOnBuyClick} /> 
      }
      <div className="card-body">
        <p><strong>{username}</strong> {description}</p>
      </div>
    </div>
  )
}

export default Post;