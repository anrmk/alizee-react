import React from "react";

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core/";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import Avatar from "../Avatar";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

const Message = React.memo(
  ({
    message,
    canDelete,

    onMediaView,
    onDelete,
  }) => {
    const classes = useStyles();

    const handleMediaPreviewClick = (index) => {
      onMediaView &&
        onMediaView({ items: message.media, startSlideIndex: index });
    };

    const handleDeleteClick = () => {
      onDelete && onDelete(message?.id);
    };

    const renderGridListTile = (file, cols = 1, rows = 1, index = 0) => (
      <ImageListItem
        key={file.id}
        cols={cols}
        rows={rows}
        onClick={() => handleMediaPreviewClick(index)}>
        <img src={file.thumbnailUrl} alt="message-img" />
        {file.kind === 1 && (
          <ImageListItemBar
            titlePosition="top"
            actionPosition="right"
            className={classes.gridListTileBar}
            actionIcon={
              <IconButton>
                <PlayArrowIcon />
              </IconButton>
            }
          />
        )}
      </ImageListItem>
    );

    const renderChatMediaItem = (mediaLength, file, index) => {
      switch (mediaLength) {
        case 1:
          return renderGridListTile(file, 1, 2, index);
        case 2:
        case 4:
          return renderGridListTile(file, 1, 1, index);
        case 3:
          if (index === 0) {
            return renderGridListTile(file, 2, 1, index);
          }
          return renderGridListTile(file, 1, 1, index);

        case 5:
          if (index === 0) {
            return renderGridListTile(file, 3, 1, index);
          }
          if (index === 1 || index === 4) {
            return renderGridListTile(file, 1, 1, index);
          }
          return renderGridListTile(file, 2, 1, index);

        default:
          return null;
      }
    };

    return (
      <ListItem dense alignItems="flex-start">
        {message.avatarUrl && (
          <ListItemAvatar>
            <Avatar
              alt={message.name ?? message.userName}
              src={message.avatarUrl}
            />
          </ListItemAvatar>
        )}

        <ListItemText
          className={classes.message}
          primary={
            <Link
              color={message.isOwner ? "primary" : "secondary"}
              href={PROFILE_USERNAME_ROUTE(message.userName)}>
              {message.name ?? `@${message.userName}`}
            </Link>
          }
          secondaryTypographyProps={{
            component: "div",
          }}
          secondary={
            <>
              {message.text && (
                <Typography
                  variant="body2"
                  component="span"
                  color="textPrimary">
                  {message.text}
                </Typography>
              )}

              {message.media?.length > 0 && (
                <ImageList
                  cols={
                    message.media.length === 2
                      ? 2
                      : Math.ceil(message.media.length / 2)
                  }
                  className={classes.media}
                  gap={1}>
                  {message.media.map((file, index) =>
                    renderChatMediaItem(message.media.length, file, index)
                  )}
                </ImageList>
              )}

              <Typography
                variant="caption"
                color="textSecondary"
                display="block">
                {formatDate(message.createdDate)}
              </Typography>
            </>
          }
        />

        {onDelete && canDelete && (
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleDeleteClick}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
);

export default Message;
