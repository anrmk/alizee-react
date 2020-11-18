import React from "react";

import IconButton from "@material-ui/core/IconButton";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnRounded";
import ShareIcon from "@material-ui/icons/ShareOutlined";

import useStyles from "./styles";

function Tools({ id, commentable, likes, iLike, amount, onGoToClick, onShareClick, onFavoriteClick, onBuyClick }) {
  const classes = useStyles();

  return (
    <>
      <IconButton className="nav-link" onClick={onFavoriteClick} aria-label="add to favorites">
        {iLike ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="secondary" />}
      </IconButton>

      {commentable && (
        <IconButton className="nav-link" onClick={onGoToClick}>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
      )}

      <IconButton aria-label="share" onClick={onShareClick}>
        <ShareIcon />
      </IconButton>

      {amount > 0 && (
        <IconButton className={classes.payable} onClick={onBuyClick}>
          <MonetizationOnOutlinedIcon />
        </IconButton>
      )}

      {likes > 0 && <strong>{likes} loves</strong>}
    </>
  );
}
export default Tools;
