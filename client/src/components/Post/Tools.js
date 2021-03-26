import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { POST_ID_ROUTE } from "../../constants/routes";

import { Chip, IconButton, Tooltip, Typography, Hidden } from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnRounded";
import BookmarkIcon from "@material-ui/icons/BookmarkOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorderOutlined";
import SendIcon from "@material-ui/icons/SendOutlined";
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined";

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
  onBuyPost,
  onPurchase,
  onReceipt,
  onShare
}) => {
  const location = window.location.href;
  const classes = useStyles();

  const handleLikeClick = () => {
    onLike && onLike(id);
  };

  const handleFavoriteClick = () => {
    onFavorite && onFavorite(id);
  };

  const handleBuyPostClick = () => {
    onBuyPost && onBuyPost({ id, amount, user });
  };

  const handlePurchaseClick = () => {
    onPurchase && onPurchase(id);
  }

  const handleReceiptClick = () => {
    onReceipt && onReceipt(id);
  };

  const handleShareClick = useCallback(() => {
    const userName = user.userName;
    onShare && onShare({id, userName});
  }, []);

  const handleSendTipClick = useCallback(() => {
    onSendTip && onSendTip(user);
  }, [user]);

  const renderPurchase = () => {
    if (amount !== 0) {
      if (!isPurchased) {
        return (
          <Tooltip title="Unlock post">
            <Chip label={amount} clickable color="primary" onClick={handleBuyPostClick} icon={<MonetizationOnIcon />} />
          </Tooltip>
        );
      } else {
        return (
          <IconButton onClick={isOwner ? handlePurchaseClick : handleReceiptClick}>
            <ReceiptIcon />
          </IconButton>
        );
      }
    }

    return null;
  };

  return (
    <>
     {isPurchased || amount === 0 && (
        <>
          <IconButton color="secondary" onClick={handleLikeClick} aria-label="add to favorites">
            {isLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography>{likes > 0 && <strong>{likes}</strong>}</Typography>
        </>
     )}

      <IconButton aria-label="share" onClick={handleShareClick}>
        <SendIcon />
      </IconButton>

      {!isOwner && (
        <>
          <Hidden mdUp>
            <IconButton aria-label="sendTip" onClick={handleSendTipClick}>
              <MonetizationOnIcon />
            </IconButton>
          </Hidden>

          <Hidden smDown>
            <Chip icon={<MonetizationOnIcon />} onClick={handleSendTipClick} label="SEND TIP" variant="outlined" clickable />
          </Hidden>
        </>
      )}

      <div className={classes.grow}></div>

      <IconButton  color="primary" aria-label="favorite" onClick={handleFavoriteClick}>
        {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>

      {renderPurchase()}

      {!location.includes(POST_ID_ROUTE(id)) && (
        <IconButton 
          to={POST_ID_ROUTE(id)}
          component={Link}>
          <VisibilityIcon  />
        </IconButton>
      )}
    </>
  )
});

export default Tools;
