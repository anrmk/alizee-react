import React from "react";
import { Link } from "react-router-dom";

import ImagesContent from "./ImagesContent";
import VideoContent from "./VideoContent";
import PayableContent from "./PayableContent";
import Tools from "./Tools";
import { AvatarItem } from "../../components/Avatar";

import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";

import MoreHorizIcon from "@material-ui/icons/MoreHorizOutlined";

import "./Post.scss";

function Post({
  id,
  userId,
  avatarUrl,
  username,
  createdDate,
  altText,
  likes,
  iLike,
  mediaUrls,
  amount,
  description,
  commentable = false,
  hideToolbar = false,
  hideHeader = false,
  onFavoriteClick,
  onBuyClick,
  onShareClick,
}) {
  const handleOnFavoriteClick = (e) => {
    e.preventDefault();
    onFavoriteClick && onFavoriteClick({ id, iLike });
  };

  const handleOnBuyClick = (e) => {
    e.preventDefault();
    onBuyClick && onBuyClick();
  };

  const handleOnShareClick = (e) => {
    e.preventDefault();
    const data = { id, title: username, quote: description };
    onShareClick && onShareClick(data);
  };

  const renderContent = (items, altText, amount) => {
    if (amount > 0) return <PayableContent amount={amount} />;

    if (!items || !items.length) return <p></p>;

    if (items.length === 1) {
      switch (items[0].kind) {
        case MEDIA_IMAGE:
          return <ImagesContent items={items} altText={altText} />;
        case MEDIA_VIDEO:
          return <VideoContent url={items[0].url} />;
        default:
          return <></>;
      }
    }

    return <ImagesContent items={items} />;
  };

  return (
    <div className="card mb-5" key={id}>
      {!hideHeader && (
        <div className="card-header d-flex align-items-center justify-content-between py-2">
          <Link to={`/users/${userId}`}>
            <AvatarItem
              url={avatarUrl}
              title={username}
              subtitle={createdDate ?? ""}
            />
          </Link>
          <MoreHorizIcon />
        </div>
      )}
      {mediaUrls?.length === 0 ? (
        <>
          <div className="card-body">
            <p>{description}</p>
          </div>
          {!hideToolbar && (
            <Tools
              userId={userId}
              id={id}
              commentable={commentable}
              likes={likes}
              iLike={iLike}
              onShareClick={handleOnShareClick}
              onFavoriteClick={handleOnFavoriteClick}
              onBuyClick={handleOnBuyClick}
            />
          )}
        </>
      ) : (
        <>
          <div className="card-content-wrapper">
            {renderContent(mediaUrls, altText, amount)}
          </div>
          {!hideToolbar && (
            <Tools
              userId={userId}
              id={id}
              commentable={commentable}
              likes={likes}
              iLike={iLike}
              onShareClick={handleOnShareClick}
              onFavoriteClick={handleOnFavoriteClick}
              onBuyClick={handleOnBuyClick}
            />
          )}
          <div className="card-body">
            <p>{description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
