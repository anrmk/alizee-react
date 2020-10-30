import React from "react";
import PropTypes from 'prop-types';

import MoreHorizIcon from "@material-ui/icons/MoreHorizOutlined";

import { AvatarItem } from "../../components/Avatar";
import MediaContent from "../../components/MediaContent";
import { PROFILE_ROUTE } from "../../constants/routes";
import Tools from "./Tools";

import "./Post.scss";
import CustomLink from "../CustomLink";

function Post({
  id,
  userId,
  avatarUrl,
  username,
  mediaUrls,
  amount,
  description,
  commentable,
  likes,
  iLike,
  createdDate,
  hideToolbar,
  hideHeader,

  onFavoriteClick,
  onCommentsClick,
  onBuyClick,
  onShareClick,
  onOptionsClick,
  onGoToClick
}) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onFavoriteClick && onFavoriteClick({ id, iLike });
  };

  const handleGoToClick = (e) => {
    e.preventDefault();
    onGoToClick && onGoToClick(id)
  }

  const handleBuyClick = (e) => {
    e.preventDefault();
    onBuyClick && onBuyClick(id);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    onShareClick && onShareClick({ id, title: username, quote: description });
  };


  const handleOptionsClick = (e) => {
    e.preventDefault();
    onOptionsClick && onOptionsClick({id, userId, username });
  }

  return (
    <div className="card mb-5">
      {!hideHeader && (
        <div className="card-header d-flex align-items-center justify-content-between py-2">

            <AvatarItem url={avatarUrl}>
              <CustomLink as="div" to={PROFILE_ROUTE(username)} >
                {username}
              </CustomLink>
              {createdDate && <><small className="text-muted">{createdDate}</small></>}
            </AvatarItem>
            <a onClick={handleOptionsClick}>
              <MoreHorizIcon />
            </a>
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
              onGoToClick={handleGoToClick}
              onShareClick={handleShareClick}
              onFavoriteClick={handleFavoriteClick}
              onBuyClick={handleBuyClick}
            />
          )}
        </>
      ) : (
        <>
          <div className="card-content-wrapper">
            <MediaContent items={mediaUrls} caption={description} amount={amount} />
          </div>
          {!hideToolbar && (
            <Tools
              userId={userId}
              id={id}
              commentable={commentable}
              likes={likes}
              iLike={iLike}
              onGoToClick={handleGoToClick}
              onShareClick={handleShareClick}
              onFavoriteClick={handleFavoriteClick}
              onBuyClick={handleBuyClick}
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

Post.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  mediaUrls: PropTypes.array,
  amount: PropTypes.number,
  description: PropTypes.string,
  commentable: PropTypes.bool,
  likes: PropTypes.number,
  iLike: PropTypes.bool,
  createdDate: PropTypes.string,
  hideToolbar: PropTypes.bool,
  hideHeader: PropTypes.bool,

  onFavoriteClick: PropTypes.func,
  onCommentsClick: PropTypes.func,
  onBuyClick: PropTypes.func,
  onShareClick: PropTypes.func
};

Post.defaultProps = {
  id: "",
  userId: "",
  avatarUrl: "",
  username: "",
  mediaUrls: [],
  amount: 0,
  description: "",
  commentable: false,
  likes: 0,
  iLike: false,
  createdDate: "",
  hideToolbar: false,
  hideHeader: false,

  onFavoriteClick: undefined,
  onCommentsClick: undefined,
  onBuyClick: undefined,
  onShareClick: undefined
};

export default Post;
