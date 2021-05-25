import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Box, Chip, IconButton, Tooltip, Typography, Hidden } from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnRounded";
import BookmarkIcon from "@material-ui/icons/BookmarkOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorderOutlined";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import ReplyIcon from '@material-ui/icons/ReplyOutlined';

import { POST_ID_ROUTE } from "../../constants/routes";

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
  isCommentable,

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
    <Box width="100%">
      <Box display="flex" alignItems="center">
        <IconButton color="secondary" disabled={!isPurchased && amount > 0} onClick={handleLikeClick} aria-label="add to favorites">
          {isLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        {!location.includes(POST_ID_ROUTE(id)) && isCommentable && (
          <IconButton 
            to={POST_ID_ROUTE(id)}
            component={Link}>
            <CommentRoundedIcon  />
          </IconButton>
        )}

        <IconButton aria-label="share" onClick={handleShareClick}>
          <ReplyIcon style={{transform: "scaleX(-1)"}} />
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
      </Box>

      {likes > 0 && (
        <Box>
          <Typography className={classes.toolsLikesText} variant="caption">{likes} likes</Typography>
        </Box>
      )}
    </Box>
  )
});

export default Tools;
