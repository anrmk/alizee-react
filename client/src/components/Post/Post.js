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

const Post = React.memo((props) => {
  const classes = useStyles();

  const { id, user, owner, post } = props;
  const { onLikeClick, onFavoriteClick, onGoToClick, onDialogToggle } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={<Avatar src={owner.avatarUrl} />}
        title={owner.name}
        subheader={owner.userName}
        action={
          <>
            <Typography display="inline" variant="caption">
              {post.createdDate && formatDate(post.createdDate)}
            </Typography>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </>
        }
      />

      <CardMedia>
        <MediaContent className={classes.post} items={post.media} amount={post.amount} isPurchased={post.isPurchased} />
      </CardMedia>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.description}
        </Typography>
      </CardContent>

      <CardActions className={classes.action} disableSpacing>
        <Tools
          id={id}
          userId={owner.id}
          username={owner.username}
          isOwner={user.id === owner.id}
          isCommentable={post.isCommentable}
          likes={post.likes}
          iLike={post.iLike}
          isFavorite={post.isFavorite}
          amount={post.amount}
          description={post.description}
          isPurchased={post.isPurchased}
          onLikeClick={onLikeClick}
          onGoToClick={onGoToClick}
          onFavoriteClick={onFavoriteClick}
          onDialogToggle={onDialogToggle}
        />
      </CardActions>
    </Card>
  );
});

Post.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object,
  owner: PropTypes.object,
  post: PropTypes.object,

  onFavoriteClick: PropTypes.func,
  onCommentsClick: PropTypes.func,
};

Post.defaultProps = {
  id: "",
  user: {},
  owner: {},
  post: {},

  onFavoriteClick: undefined,
  onCommentsClick: undefined,
  onDialogToggle: undefined,
};

export default Post;
