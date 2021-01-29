import React from "react";

import { formatDate } from "../../helpers/functions";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
} from "@material-ui/core";

import { Tools, Menu } from "../../components/Post";
import MediaContent from "../../components/MediaContent";

import useStyles from "./styles";

const Post = React.memo((props) => {
  const classes = useStyles();

  const { id, user, owner, post } = props;
  const { onFollow, onUnfollow, onBlock, onUnblock, onReport } = props;
  const { onLike, onFavorite, onDialogToggle } = props;

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

            <Menu 
              user={owner}
              isOwner={user.id === owner.id}

              onFollow={onFollow}
              onUnfollow={onUnfollow}
              onBlock={onBlock}
              onUnblock={onUnblock}
              onReport={onReport}
            />
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
          user={owner}
          likes={post.likes}
          iLike={post.iLike}
          isFavorite={post.isFavorite}
          amount={post.amount}
          isPurchased={post.isPurchased}
          isOwner={user.id === owner.id}
          
          onLike={onLike}
          onFavorite={onFavorite}
          onDialogToggle={onDialogToggle}
        />
      </CardActions>
    </Card>
  );
});


export default Post;
