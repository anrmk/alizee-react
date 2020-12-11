import React from "react";
import PropTypes from "prop-types";

import {formatDate} from "../../helpers/functions";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

import { Tools } from "../../components/Post";
import MediaContent from "../../components/MediaContent";

import useStyles from "./styles";

function Post(props) {
  const classes = useStyles();

  const {
    id,
    userId,
    avatarUrl,
    name,
    username,
    mediaUrls,
    amount,
    description,
    commentable,
    likes,
    iLike,
    isFavorite,
    isPurchased,
    createdDate,
    hideToolbar,
    hideHeader,
  } = props;

  const {
    onLikeClick,
    onFavoriteClick,
    onShareClick,
    onGoToClick,
    onPayClick,
    onReceiptClick
  } = props;

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

  const handlePayClick = (e) => {
    e.preventDefault();
    onPayClick && onPayClick({ id, amount });
  };

  const handleReceiptClick = (e) => {
    e.preventDefault();
    onReceiptClick && onReceiptClick(id);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    onShareClick && onShareClick({ id, title: username, quote: description });
  };

  return (
    <Card className={classes.root} variant="elevation">
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        title={name}
        subheader={username}
        action={
          <>
          <Typography display="inline" variant="caption">
            {createdDate && formatDate(new Date(createdDate))}
          </Typography>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          </>
        }
      ></CardHeader>

      <CardMedia>
        <MediaContent className={classes.post} items={mediaUrls} amount={amount} isPurchased={isPurchased} />
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
            isPurchased={isPurchased}

            onLikeClick={handleLikeClick}
            onGoToClick={handleGoToClick}
            onShareClick={handleShareClick}
            onFavoriteClick={handleFavoriteClick}
            onPayClick={handlePayClick}
            onReceiptClick={handleReceiptClick}
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
  onShareClick: PropTypes.func,
  onPayClick: PropTypes.func,
  onReceiptClick: PropTypes.func,
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
  onShareClick: undefined,
  onPayClick: undefined,
  onReceiptClick: undefined,
};

export default Post;
