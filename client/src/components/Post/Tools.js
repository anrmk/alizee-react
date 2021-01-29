import React from "react";
import { useHistory } from "react-router-dom";

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

import {
  PAYMENT_DIALOG_TYPE,
  SHARE_DIALOG_TYPE,
  RECEIPT_DIALOG_TYPE,
  PURCHASES_DIALOG_TYPE,
  SEND_TIP_DIALOG_TYPE,
} from "../../hooks/usePostDialog";
import useStyles from "./styles";

const Tools = React.memo(
  ({
    id,

    user,

    likes,
    amount,

    iLike,
    isFavorite,
    isPurchased,
    isOwner,

    onLike,
    onFavorite,
    onDialogToggle,
  }) => {
    const location = window.location.href;
    const history = useHistory();
    const classes = useStyles();

    const handleLike = () => {
      onLike && onLike(id);
    };

    const handleFavorite = () => {
      onFavorite && onFavorite(id);
    };

    const handlePay = () => {
      onDialogToggle && onDialogToggle({ id, amount }, PAYMENT_DIALOG_TYPE);
    };

    const handleReceipt = () => {
      onDialogToggle && onDialogToggle({ id }, isOwner ? PURCHASES_DIALOG_TYPE : RECEIPT_DIALOG_TYPE);
    };

    const handleSendTip = () => {
      onDialogToggle && onDialogToggle({ id, user }, SEND_TIP_DIALOG_TYPE);
    };

    const handleShare = () => {
      onDialogToggle && onDialogToggle({ id }, SHARE_DIALOG_TYPE);
    };

    const handleGoToPost = () => {
      history.push(POST_ID_ROUTE(id));
    };

    const renderPurchase = (amount, isPurchased) => {
      if (amount !== 0) {
        if (!isPurchased) {
          return (
            <Tooltip title="Unlock post">
              <Chip label={amount} clickable color="primary" onClick={handlePay} icon={<MonetizationOnIcon />} />
            </Tooltip>
          );
        } else {
          return (
            <IconButton onClick={handleReceipt}>
              <ReceiptIcon />
            </IconButton>
          );
        }
      }

      return null;
    };

    return (
      <>
        <IconButton className="danger" onClick={handleLike} aria-label="add to favorites">
          {iLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography>{likes > 0 && <strong>{likes}</strong>}</Typography>

        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon />
        </IconButton>

        <Chip icon={<MonetizationOnIcon />} onClick={handleSendTip} label="SEND TIP" variant="outlined" clickable />

        <div className={classes.grow}></div>

        {renderPurchase(amount, isPurchased)}

        <IconButton className="success" aria-label="share" onClick={handleFavorite}>
          {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>

        {!location.includes(POST_ID_ROUTE(id)) && (
          <IconButton className="warning" onClick={handleGoToPost}>
            <VisibilityIcon />
          </IconButton>
        )}
      </>
    );
  }
);

export default Tools;
