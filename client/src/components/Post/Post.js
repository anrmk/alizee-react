import React from "react";
import { Link } from "react-router-dom";

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

import Tools from "./Tools";
import MediaContent from "../../components/MediaContent";

import useStyles from "./styles";
import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

const Post = React.memo((props) => {
  const classes = useStyles();

  const { id, user, owner, post } = props;
  const { likes, isLike, isFavorite } = props;
  const { onFollow, onUnfollow, onBlock, onUnblock, onReport, onShareToChatClick } = props;
  const { onLike, onFavorite, onSendTip, onBuyPost, onReceipt, onPurchase, onShare, onMenu } = props;

  const handleMenuClick = () => {
    onMenu && onMenu({ id, userName: owner.UserName });
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Link to={PROFILE_USERNAME_ROUTE(owner.userName)}>
            <Avatar src={owner.avatarUrl} />
          </Link>
        }
        title={owner.name}
        subheader={owner.userName}
        action={
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardMedia>
        <MediaContent className={classes.post} items={post.media} amount={post.amount} isPurchased={post.isPurchased} isOwner={user.id === owner.id} />
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
          likes={likes}
          isLike={isLike}
          isFavorite={isFavorite}
          amount={post.amount}
          isPurchased={post.isPurchased}
          isOwner={user.id === owner.id}
          onLike={onLike}
          onFavorite={onFavorite}
          onSendTip={onSendTip}
          onBuyPost={onBuyPost}
          onReceipt={onReceipt}
          onPurchase={onPurchase}
          onShare={onShare}
        />
      </CardActions>
    </Card>
  );
});

export default Post;
