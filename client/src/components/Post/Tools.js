import React from "react";
import PropTypes from "prop-types";

import { Chip, Hidden, IconButton, Tooltip } from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnRounded";
import BookmarkIcon from "@material-ui/icons/BookmarkOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined";

import { PAYMENT_DIALOG_TYPE, SHARE_DIALOG_TYPE, RECEIPT_DIALOG_TYPE, PURCHASES_DIALOG_TYPE } from "../../hooks/usePostDialog";
import useStyles from "./styles";

const Tools = React.memo(({
  id,
  likes,
  iLike,
  isFavorite,
  amount,
  userName,
  description,
  isPurchased,
  isOwner,

  onGoToClick,
  onLikeClick,
  onFavoriteClick,
  onDialogToggle
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
    onDialogToggle && onDialogToggle({ id, amount }, PAYMENT_DIALOG_TYPE);
  };

  const handleReceiptClick = () => {
    onDialogToggle && onDialogToggle({ id }, isOwner ? PURCHASES_DIALOG_TYPE : RECEIPT_DIALOG_TYPE);
  };

  const handleShareClick = () => {
    onDialogToggle && onDialogToggle({ id }, SHARE_DIALOG_TYPE);
  };

  const renderPurchase = (amount, isPurchased) => {
    if (amount !== 0) {
      if (!isPurchased) {
        return (
          <Tooltip title="Unlock post">
            <Chip
              label={amount}
              clickable
              variant="outlined"
              color="primary"
              onClick={handlePayClick}
              icon={<MonetizationOnIcon />}
            />
          </Tooltip>
        );
      } else {
        return (
          <IconButton onClick={handleReceiptClick}>
            <ReceiptIcon />
          </IconButton>
        );
      }
    }

    return null;
  };

  return (
    <>
      <IconButton className="danger" onClick={handleLikeClick} aria-label="add to favorites">
        {iLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <Hidden mdDown>{likes > 0 && <strong>{likes}</strong>}</Hidden>

      <IconButton aria-label="share" onClick={handleShareClick}>
        <ShareIcon />
      </IconButton>

      <div className={classes.grow}></div>

      {renderPurchase(amount, isPurchased)}

      <IconButton className="success" aria-label="share" onClick={handleFavoriteClick}>
        {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>

      {onGoToClick && <IconButton className="warning" onClick={handleGoToClick}>
        <VisibilityIcon />
      </IconButton>}
    </>
  );
});

Tools.propTypes = {
  id: PropTypes.string,
  likes: PropTypes.number,
  iLike: PropTypes.bool,
  isFavorite: PropTypes.bool,
  amount: PropTypes.number,
  userName: PropTypes.string,
  description: PropTypes.string,

  onGoToClick: PropTypes.func,
  onShareClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  onPayClick: PropTypes.func,
  onReceiptClick: PropTypes.func,
  onDialogToggle: PropTypes.func
};

Tools.defaultProps = {
  id: undefined,
  likes: 0,
  iLike: false,
  isFavorite: false,
  amount: 0,

  onGoToClick: undefined,
  onShareClick: undefined,
  onFavoriteClick: undefined,
  onPayClick: undefined,
  onReceiptClick: undefined,
  onDialogToggle: undefined
};

export default Tools;
