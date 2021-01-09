import React from "react";
import PropTypes from "prop-types";

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

const Tools = React.memo(({
  id,
  isCommentable,
  likes,
  iLike,
  isFavorite,
  amount,
  username,
  description,
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
  onReceiptClick
}) => {
  const classes = useStyles();

  const handleLikeClick = () => {
    onLikeClick && onLikeClick(id);
  };

  const handleFavoriteClick = () => {
    onFavoriteClick && onFavoriteClick(id);
  };

  const handleGoToClick = () => {
    onGoToClick && onGoToClick(id);
  };

  const handlePayClick = () => {
    onPayClick && onPayClick({ id, amount });
  };

  const handleReceiptClick = () => {
    onReceiptClick && onReceiptClick(id);
  };

  const handleShareClick = () => {
    onShareClick && onShareClick({ id, title: username, quote: description });
  };

  const renderPurchase = (amount, isPurchased) => {
    if (amount !== 0) {
      if (!isPurchased) {
        return (
          <Button
            variant="contained"
            size="small"
            className="gold"
            onClick={handlePayClick}
            startIcon={<MonetizationOnIcon />}>
            {amount}
          </Button>
        );
      } else {
        return (
          <IconButton onClick={handleReceiptClick}>
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
      <IconButton className="danger" onClick={handleLikeClick} aria-label="add to favorites">
        {iLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Hidden mdDown>{likes > 0 && <strong>{likes}</strong>}</Hidden>

      {isCommentable && !hideCommentable && (
        <IconButton className="warning" onClick={handleGoToClick}>
          <ChatIcon />
        </IconButton>
      )}

      <IconButton aria-label="share" onClick={handleShareClick}>
        <ShareIcon />
      </IconButton>

      <div className={classes.grow}></div>

      <IconButton className="success" aria-label="share" onClick={handleFavoriteClick}>
        {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>

      {renderPurchase(amount, isPurchased)}

      {!hideWatch && (
        <Button variant="contained" size="small" className="primary" onClick={handleGoToClick}>
          Watch
        </Button>
      )}
    </>
  );
});

Tools.propTypes = {
  id: PropTypes.string,
  isCommentable: PropTypes.bool,
  likes: PropTypes.number,
  iLike: PropTypes.bool,
  isFavorite: PropTypes.bool,
  amount: PropTypes.number,
  username: PropTypes.string,
  description: PropTypes.string,

  hideCommentable: PropTypes.bool,
  hideLike: PropTypes.bool,
  hideFavorite: PropTypes.bool,
  hideWatch: PropTypes.bool,

  onGoToClick: PropTypes.func,
  onShareClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  onPayClick: PropTypes.func,
  onReceiptClick: PropTypes.func,
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
