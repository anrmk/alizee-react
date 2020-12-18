import React from "react";
import Props from "prop-types";

import { Button, Hidden, IconButton } from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnRounded";
import BookmarkIcon from "@material-ui/icons/BookmarkOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";

import useStyles from "./styles";

function Tools({
  id,
  isCommentable,
  likes,
  iLike,
  isFavorite,
  amount,
  isPurchased,

  hideCommentable,
  hideLike,
  hideFavorite,
  hideWatch,

  onGoToClick,
  onShareClick,
  onLikeClick,
  onFavoriteClick,
  onPayClick,
  onReceiptClick,
}) {
  const classes = useStyles();

  const renderPurchase = (amount, isPurchased) => {
    if (amount !== 0) {
      if (!isPurchased) {
        return (
          <Button
            variant="contained"
            size="small"
            className="gold"
            onClick={onPayClick}
            startIcon={<MonetizationOnIcon />}
          >
            {amount}
          </Button>
        );
      } else {
        return (
          <IconButton onClick={onReceiptClick}>
            <ReceiptIcon />
          </IconButton>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <IconButton className="danger" onClick={onLikeClick} aria-label="add to favorites">
        {iLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Hidden mdDown>{likes > 0 && <strong>{likes}</strong>}</Hidden>

      {isCommentable && !hideCommentable && (
        <IconButton className="warning" onClick={onGoToClick}>
          <ChatIcon />
        </IconButton>
      )}

      <IconButton aria-label="share" onClick={onShareClick}>
        <ShareIcon />
      </IconButton>

      <div className={classes.grow}></div>

      <IconButton className="success" aria-label="share" onClick={onFavoriteClick}>
        {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>

      {renderPurchase(amount, isPurchased)}

      {!hideWatch && (
        <Button variant="contained" size="small" className="primary" onClick={onGoToClick}>
          Watch
        </Button>
      )}
    </>
  );
}

Tools.propTypes = {
  id: Props.string,
  isCommentable: Props.bool,
  likes: Props.number,
  iLike: Props.bool,
  isFavorite: Props.bool,
  amount: Props.number,

  hideCommentable: Props.bool,
  hideLike: Props.bool,
  hideFavorite: Props.bool,
  hideWatch: Props.bool,

  onGoToClick: Props.func,
  onShareClick: Props.func,
  onFavoriteClick: Props.func,
  onPayClick: Props.func,
  onReceiptClick: Props.func,
};

Tools.defaultProps = {
  id: undefined,
  isCommentable: false,
  likes: 0,
  iLike: false,
  isFavorite: false,
  amount: 0,

  hideCommentable: false,
  hideLike: false,
  hideFavorite: false,
  hideWatch: false,

  onGoToClick: undefined,
  onShareClick: undefined,
  onFavoriteClick: undefined,
  onPayClick: undefined,
  onReceiptClick: undefined,
};

export default Tools;
