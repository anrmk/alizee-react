import React from "react";

import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core/";
import Avatar from "../Avatar";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";
import ClearIcon from "@material-ui/icons/Clear";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

const Message = React.memo(
  ({
    message,
    isOwner,

    onMediaView,
    onDelete,
  }) => {
    const classes = useStyles();

    const handleMediaPreviewClick = (index) => {
      onMediaView && onMediaView({ items: message.media, startSlideIndex: index });
    };

    const handleDeleteClick = () => {
      onDelete && onDelete(message?.id);
    };

    const renderGridListTile = (file, cols = 1, rows = 1, index = 0) => {
      return (
        <GridListTile key={file.id} cols={cols} rows={rows} onClick={() => handleMediaPreviewClick(index)}>
          <img src={file.thumbnailUrl} />
          {file.kind === 1 && (
            <GridListTileBar
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
        </GridListTile>
      );
    };

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
          } else {
            return renderGridListTile(file, 1, 1, index);
          }
        case 5:
          if (index === 0) {
            return renderGridListTile(file, 3, 1, index);
          } else if (index === 1 || index === 4) {
            return renderGridListTile(file, 1, 1, index);
          } else {
            return renderGridListTile(file, 2, 1, index);
          }
        default:
          return;
      }
    };

    return (
      <ListItem dense alignItems="flex-start">
        {message.avatarUrl && (
          <ListItemAvatar>
            <Avatar alt={message.name ?? message.userName} src={message.avatarUrl} borderColor="silver" />
          </ListItemAvatar>
        )}

        <ListItemText
          primary={
            <Link color={message.isOwner ? "primary" : "secondary"} href={PROFILE_USERNAME_ROUTE(message.userName)}>
              {message.name ?? `@${message.userName}`}
            </Link>
          }
          secondaryTypographyProps={{
            component: "div",
          }}
          secondary={
            <React.Fragment>
              {message.text && (
                <Typography variant="body2" component="span" color="textPrimary">
                  {message.text}
                </Typography>
              )}

              {message.media?.length > 0 && (
                <GridList
                  cols={message.media.length === 2 ? 2 : Math.ceil(message.media.length / 2)}
                  className={classes.media}
                  spacing={1}
                >
                  {message.media.map((file, index) => {
                    return renderChatMediaItem(message.media.length, file, index);
                  })}
                </GridList>
              )}

              <Typography variant="caption" color="textSecondary" display="block">
                {formatDate(message.createdDate)}
              </Typography>
            </React.Fragment>
          }
        />

        {onDelete && isOwner && (
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
              <ClearIcon fontSize="small" color="error" />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
);

export default Message;
