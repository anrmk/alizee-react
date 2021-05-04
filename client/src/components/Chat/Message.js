import React from "react";

import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  IconButton,
  Link
} from "@material-ui/core/";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";
import ClearIcon from "@material-ui/icons/Clear"; 

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

const Message = React.memo(({
    message,
    isOwner,

    onMediaView,
    onDelete
  }) => {
    const classes = useStyles();

    const handleMediaPreviewClick = (index) => {
      onMediaView && onMediaView({ items: message.media, startSlideIndex: index });
    };
    
    const handleDeleteClick = () => {
      onDelete && onDelete(message?.id);
    }

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
      <ListItem dense>
        {message.avatarUrl && (
          <ListItemAvatar>
            <Avatar alt={message.userName} src={message.avatarUrl} className={classes.avatar} />
          </ListItemAvatar>
        )}

        <ListItemText
          primary={
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Link color={isOwner ? "secondary" : "primary"} href={PROFILE_USERNAME_ROUTE(message.userName)}>
                  @{message.userName}
                </Link>
                <Typography variant="caption" color="textSecondary">
                  {formatDate(message.createdDate)}
                </Typography>
              </Box>

              {message.media?.length > 0 && (
                <GridList cols={message.media.length === 2 ? 2 : Math.ceil(message.media.length / 2)}>
                  {message.media.map((file, index) => {
                    return renderChatMediaItem(message.media.length, file, index);
                  })}
                </GridList>
              )}
            </Box>
          }
          secondary={<Typography variant="body2">{message.message}</Typography>}
        />

        {onDelete && isOwner && (
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleDeleteClick}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
);

export default Message;
