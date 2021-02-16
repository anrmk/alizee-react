import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { POST_ID_ROUTE } from "../../constants/routes";

import { Chip, IconButton, Tooltip, Typography } from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnRounded";
import BookmarkIcon from "@material-ui/icons/BookmarkOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined";

import { PAYMENT_DIALOG_TYPE, SHARE_DIALOG_TYPE, RECEIPT_DIALOG_TYPE, PURCHASES_DIALOG_TYPE, SEND_TIP_DIALOG_TYPE } from "../../constants/dialogs";
import useStyles from "./styles";

const Tools = React.memo(({
  id,

  user,

  likes,
  amount,

  isLike,
  isFavorite,
  isPurchased,
  isOwner,

  onLike,
  onFavorite,
  onSendTip,
  onDialogToggle
}) => {
  const location = window.location.href;
  const classes = useStyles();

  const handleLikeClick = () => {
    onLike && onLike(id);
  };

  const handleFavoriteClick = () => {
    onFavorite && onFavorite(id);
  };

  const handlePayClick = () => {
    onDialogToggle && onDialogToggle(PAYMENT_DIALOG_TYPE, { id, amount });
  };

  const handleReceiptClick = () => {
    onDialogToggle && onDialogToggle(isOwner ? PURCHASES_DIALOG_TYPE : RECEIPT_DIALOG_TYPE, { id });
  };

  const handleShareClick = useCallback(() => {
    onDialogToggle && onDialogToggle(SHARE_DIALOG_TYPE, { id });
  }, []);

  const handleSendTipClick = useCallback(() => {
    onSendTip && onSendTip(user);
  }, [user]);

  const renderPurchase = () => {
    if (amount !== 0) {
      if (!isPurchased) {
        return (
          <Tooltip title="Unlock post">
            <Chip label={amount} clickable color="primary" onClick={handlePayClick} icon={<MonetizationOnIcon />} />
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
        {isLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography>{likes > 0 && <strong>{likes}</strong>}</Typography>

      <IconButton aria-label="share" onClick={handleShareClick}>
        <ShareIcon />
      </IconButton>

      <Chip icon={<MonetizationOnIcon />} onClick={handleSendTipClick} label="SEND TIP" variant="outlined" clickable />

      <div className={classes.grow}></div>

      <IconButton className="success" aria-label="share" onClick={handleFavoriteClick}>
        {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>

      {renderPurchase()}

      {!location.includes(POST_ID_ROUTE(id)) && (
        <IconButton
          className="warning"
          to={POST_ID_ROUTE(id)}
          component={Link}>
          <VisibilityIcon />
        </IconButton>
      )}
    </>
  )
});

export default Tools;
