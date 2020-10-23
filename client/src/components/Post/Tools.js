import React from "react";
import { Link } from "react-router-dom";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import { POST_ROUTE } from "../../constants/routes";

import "./Tools.scss";

function Tools({
  id,
  commentable,
  likes,
  iLike,
  onShareClick,
  onFavoriteClick,
  onBuyClick,
}) {
  return (
    <div className="mb-2">
      <div className="nav nav-tools">
        {iLike ? 
          (<a className="nav-link" onClick={onFavoriteClick}><FavoriteIcon className="text-danger" /></a>) : 
          (<a className="nav-link" onClick={onFavoriteClick}><FavoriteBorderIcon /></a>)}

        {commentable && (
          <Link className="nav-link" to={`${POST_ROUTE}/${id}`}>
            <ChatBubbleOutlineOutlinedIcon />
          </Link>
        )}
        <a className="nav-link" onClick={onShareClick}>
          <ShareOutlinedIcon />
        </a>
        <a className="nav-link" onClick={onBuyClick}>
          <MonetizationOnOutlinedIcon />
        </a>
      </div>
      {likes > 0 && <strong className="ml-3">{likes} loves</strong>}
    </div>
  );
}
export default Tools;