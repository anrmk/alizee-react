import React from "react";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import ShareOutlinedIcon from "@material-ui/icons/ShareRounded";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnRounded";
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
          (<IconButton className="nav-link" onClick={onFavoriteClick}><FavoriteIcon color="secondary" /></IconButton>) : 
          (<IconButton className="nav-link" onClick={onFavoriteClick}><FavoriteBorderIcon color="secondary" /></IconButton>)
        }
        
        {commentable && (
          <IconButton className="nav-link" component={Link} to={`${POST_ROUTE}/${id}`}>
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>
        )}
        <IconButton className="nav-link" onClick={onShareClick}>
          <ShareOutlinedIcon />
        </IconButton>
        <IconButton className="nav-link" onClick={onBuyClick}>
          <MonetizationOnOutlinedIcon />
        </IconButton>
      </div>
      {likes > 0 && <strong className="ml-3">{likes} loves</strong>}
    </div>
  );
}
export default Tools;