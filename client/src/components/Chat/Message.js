import React from "react";
import clsx from "clsx";
import { Box, GridList, GridListTile, GridListTileBar, Paper, Typography, withWidth } from "@material-ui/core/";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";

import { formatDate, generateFileUrl } from "../../helpers/functions";

import useStyles from "./styles";

const Message = React.memo(({
  width,
  message,
  isOwner,
  liveChat,
  className,

  onMediaView
}) => {
  const classes = useStyles();

  const handleMediaPreviewClick = (file) => {
    onMediaView && onMediaView({ type: file.kind, url: generateFileUrl(process.env.REACT_APP_DOMAIN, file.url) })
  }

  const renderGridListTile = (file, cols = 1, rows = 1) => {
    return (
      <GridListTile key={file.id} cols={cols} rows={rows} onClick={() => handleMediaPreviewClick(file)}>
        <img src={generateFileUrl(process.env.REACT_APP_DOMAIN, file.thumbnailUrl)} />
        {file.kind === 1 && <GridListTileBar
          titlePosition="top"
          actionPosition="right"
          className={classes.gridListTileBar}
          actionIcon={
            <PlayArrowIcon className={classes.icon} />
          }
        />}
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
    <Paper
      className={clsx(
        classes.messengerMessage,
        className,
        isOwner && classes.messengerMyMessage,
        message.media?.length > 0 && classes.messengerMediaMessage
      )}
    >
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Typography variant="body2">{message.message}</Typography>
        {message.media?.length === 0 && (<Typography className={classes.messengerMessageDate} variant="caption" component="small">
          {formatDate(message.createdDate)}
        </Typography>)
      }
      </Box>
      {message.media?.length > 0 && (
        <GridList
          cellHeight={width === "xs" ? 120 : 160}
          cols={message.media.length === 2 ? 2 : Math.ceil(message.media.length / 2)}
        >
          {message.media.map((file, index) => {
            return renderChatMediaItem(message.media.length, file, index);
          })}
        </GridList>
      )}
    </Paper>
  );
});

export default withWidth()(Message);
