import React from "react";
import PropTypes from "prop-types";

import { formatDate } from "../../helpers/functions";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

import { Tools } from "../../components/Post";
import MediaContent from "../../components/MediaContent";

import useStyles from "./styles";

// TODO: add optimization (list item doesn't optimized)
const Post = React.memo((props) => {
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
    isCommentable,
    likes,
    iLike,
    isFavorite,
    isPurchased,
    createdDate,
  } = props;

  const {
    onLikeClick,
    onFavoriteClick,
    onGoToClick,
    onDialogToggle 
  } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        title={name}
        subheader={username}
        action={
          <>
            <Typography display="inline" variant="caption">
              {createdDate && formatDate(createdDate)}
            </Typography>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </>
        }
      />

      <CardMedia>
        <MediaContent className={classes.post} items={mediaUrls} amount={amount} isPurchased={isPurchased} />
      </CardMedia>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>

      <CardActions className={classes.action} disableSpacing>
        <Tools
          userId={userId}
          id={id}
          isCommentable={isCommentable}
          likes={likes}
          iLike={iLike}
          isFavorite={isFavorite}
          amount={amount}
          username={username}
          description={description}
          isPurchased={isPurchased}
          onLikeClick={onLikeClick}
          onGoToClick={onGoToClick}
          onFavoriteClick={onFavoriteClick}
          onDialogToggle={onDialogToggle} />
      </CardActions>
    </Card>
  );
});

Post.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  mediaUrls: PropTypes.array,
  amount: PropTypes.number,
  description: PropTypes.string,
  isCommentable: PropTypes.bool,
  likes: PropTypes.number,
  iLike: PropTypes.bool,
  isFavorite: PropTypes.bool,
  createdDate: PropTypes.string,

  onFavoriteClick: PropTypes.func,
  onCommentsClick: PropTypes.func,
};

Post.defaultProps = {
  id: "",
  userId: "",
  avatarUrl: "",
  username: "",
  mediaUrls: [],
  amount: 0,
  description: "",
  isCommentable: false,
  likes: 0,
  iLike: false,
  isFavorite: false,
  createdDate: "",

  onFavoriteClick: undefined,
  onCommentsClick: undefined,
  onDialogToggle: undefined
};

export default Post;
