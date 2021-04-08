import React from "react";
import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  IconButton,
  Link
} from "@material-ui/core/";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";

import { formatDate, generateFileUrl } from "../../helpers/functions";

import useStyles from "./styles";

const Message = React.memo(({
    message,
    isOwner,

    onMediaView
  }) => {
    const classes = useStyles();

    const handleMediaPreviewClick = (file) => {
      onMediaView && onMediaView({ type: file.kind, url: generateFileUrl(process.env.REACT_APP_DOMAIN, file.url) });
    };

    const renderGridListTile = (file, cols = 1, rows = 1) => {
      return (
        <GridListTile key={file.id} cols={cols} rows={rows} onClick={() => handleMediaPreviewClick(file)}>
          <img src={generateFileUrl(process.env.REACT_APP_DOMAIN, file.thumbnailUrl)} />
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
          return renderGridListTile(file, 1, 2);
        case 2:
        case 4:
          return renderGridListTile(file);
        case 3:
          if (index === 0) {
            return renderGridListTile(file, 2);
          } else {
            return renderGridListTile(file);
          }
        case 5:
          if (index === 0) {
            return renderGridListTile(file, 3);
          } else if (index === 1 || index === 4) {
            return renderGridListTile(file);
          } else {
            return renderGridListTile(file, 2);
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
        ></ListItemText>
      </ListItem>
    );
  }
);

export default Message;
