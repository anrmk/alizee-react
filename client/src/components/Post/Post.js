import React, { useRef, useState } from "react";
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
  Divider
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

import Tools from "./Tools";
import MediaContent from "../../components/MediaContent";
import { MessageSenderInput } from "../Chat";
import CommentsPreview from "./CommentsPreview";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import useDoubleTap from "../../hooks/useDoubleTap";

import useStyles from "./styles";

const Post = React.memo((props) => {
  const classes = useStyles();
  const [isLikeAnimation, setIsLikeAnimation] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  let timerLikeAnimation = useRef().current;

  const { id, user, owner, post } = props;
  const { likes, isLike, isFavorite } = props;
  const { onLike, onFavorite, onSendTip, onBuyPost, onReceipt, onPurchase, onShare, onMenu, onCommentSend, onFullScreen } = props;

  const handleMenuClick = () => {
    onMenu && onMenu({ postId: id, userName: owner.userName, isOwner: user.id === owner.id });
  };

  const handleCommentSendClick = (data) => {
    onCommentSend && onCommentSend({ ...data, postId: id });
  }

  const handleFullScreenClick = () => {
    if (post.isPurchased || post.amount === 0) {
      onFullScreen && onFullScreen({ post, startSlideIndex: currentSlideIndex });
    }
  }

  const handleChangeSlideIndex = (index) => {
    if (post?.media[index]) {
      setCurrentSlideIndex(index);
    }
  }

  const doubleTap = useDoubleTap(() => {
    if (!post.isPurchased && post.amount !== 0) return;

    onLike && onLike(id);

    timerLikeAnimation && clearTimeout(timerLikeAnimation);

    setIsLikeAnimation(true);
    timerLikeAnimation = setTimeout(() => setIsLikeAnimation(false), 400);
  }, 200, { onSingleTap: handleFullScreenClick });

  const renderDescription = (text, withGutter) => (
    <Typography
      className={classes.postDescriptionText}
      variant="body2"
      component="p"
      gutterBottom={withGutter}>
      {text}
    </Typography>
  );

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

      <CardMedia {...doubleTap}>
        <MediaContent
          className={classes.mediaContent}
          id={id}
          user={owner}
          items={post.media}
          amount={post.amount}
          isPurchased={post.isPurchased}
          isOwner={user.id === owner.id}
          isLiked={isLikeAnimation}
          onPayClick={onBuyPost}
          onChangeIndex={handleChangeSlideIndex}
        />
      </CardMedia>

      <CardContent className={classes.postCardContent}>
        {post.media.length === 0 && renderDescription(post.description, true)}
        <Tools
          id={id}
          user={owner}
          likes={likes}
          isLike={isLike}
          isFavorite={isFavorite}
          amount={post.amount}
          isPurchased={post.isPurchased}
          isOwner={user.id === owner.id}
          isCommentable={post.isCommentable}
          onLike={onLike}
          onFavorite={onFavorite}
          onSendTip={onSendTip}
          onBuyPost={onBuyPost}
          onReceipt={onReceipt}
          onPurchase={onPurchase}
          onShare={onShare}
        />
        {post.media.length > 0 && post.isPurchased && renderDescription(post.description)}
      </CardContent>

      <CardActions className={classes.action} disableSpacing>
        {post.isCommentable &&
          (post.amount === 0 || user.id === owner.id || post.isPurchased) && (
            <>
              {post.comments.length > 0 && <CommentsPreview items={post.comments} />}
              <Divider className={classes.divider} />
              <MessageSenderInput hideMediaEditor transparentBg placeholder="Add a comment..." onSendMessageClick={handleCommentSendClick} />
            </>
          )}
      </CardActions>
    </Card>
  );
});

export default Post;
