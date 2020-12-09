import React from "react";
import PropTypes from "prop-types";

import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

import { Tools } from "../../components/Post";
import MediaContent from "../../components/MediaContent";

import useStyles from "./styles";

function Post({
  id,
  userId,
  avatarUrl,
  username,
  mediaUrls,
  amount,
  description,
  commentable,
  likes,
  iLike,
  isFavorite,
  createdDate,
  hideToolbar,
  hideHeader,

  onLikeClick,
  onFavoriteClick,
  onCommentsClick,
  onBuyClick,
  onShareClick,
  onOptionsClick,
  onGoToClick,
}) {
  const classes = useStyles();

  const handleLikeClick = (e) => {
    e.preventDefault();
    onLikeClick && onLikeClick(id);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onFavoriteClick && onFavoriteClick(id);
  };

  const handleGoToClick = (e) => {
    e.preventDefault();
    onGoToClick && onGoToClick(id);
  };

  const handleBuyClick = (e) => {
    e.preventDefault();
    onBuyClick && onBuyClick(id);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    onShareClick && onShareClick({ id, title: username, quote: description });
  };

  const handleOptionsClick = (e) => {
    e.preventDefault();
    onOptionsClick && onOptionsClick({ id, userId, username });
  };

  return (
    <Card className={classes.root} variant="elevation">
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        action={
          <IconButton aria-label="settings" onClick={handleOptionsClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader="September 14, 2016"
      ></CardHeader>

      <CardMedia>
        <MediaContent className={classes.post} items={mediaUrls} amount={amount} />
      </CardMedia>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.action} disableSpacing>
        {!hideToolbar && (
          <Tools
            userId={userId}
            id={id}
            commentable={commentable}
            likes={likes}
            iLike={iLike}
            isFavorite={isFavorite}
            amount={amount}
            onLikeClick={handleLikeClick}
            onGoToClick={handleGoToClick}
            onShareClick={handleShareClick}
            onFavoriteClick={handleFavoriteClick}
            onBuyClick={handleBuyClick}
          />
        )}
      </CardActions>
    </Card>
  );
}

Post.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  mediaUrls: PropTypes.array,
  amount: PropTypes.number,
  description: PropTypes.string,
  commentable: PropTypes.bool,
  likes: PropTypes.number,
  iLike: PropTypes.bool,
  isFavorite: PropTypes.bool,
  createdDate: PropTypes.string,
  hideToolbar: PropTypes.bool,
  hideHeader: PropTypes.bool,

  onFavoriteClick: PropTypes.func,
  onCommentsClick: PropTypes.func,
  onBuyClick: PropTypes.func,
  onShareClick: PropTypes.func,
};

Post.defaultProps = {
  id: "",
  userId: "",
  avatarUrl: "",
  username: "",
  mediaUrls: [],
  amount: 0,
  description: "",
  commentable: false,
  likes: 0,
  iLike: false,
  isFavorite: false,
  createdDate: "",
  hideToolbar: false,
  hideHeader: false,

  onFavoriteClick: undefined,
  onCommentsClick: undefined,
  onBuyClick: undefined,
  onShareClick: undefined,
};

export default Post;
