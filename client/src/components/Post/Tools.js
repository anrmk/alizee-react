import React from "react";

import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import ShareOutlinedIcon from "@material-ui/icons/ShareRounded";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnRounded";

import "./Tools.scss";

function Tools({
  id,
  commentable,
  likes,
  iLike,
  onGoToClick,
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
          <IconButton className="nav-link" onClick={onGoToClick} >
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