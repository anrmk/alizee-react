import React from "react";
import clsx from "clsx";
import { Paper, Typography } from "@material-ui/core/";

import useStyles from "./styles";

function Message({
  message,
  isOwner,
  liveChat,
  className
}) {
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.messengerMessage, className, !liveChat && isOwner && classes.messengerMyMessage)}>
      <Typography variant="body2" gutterBottom>
        {message.message}
      </Typography>
      <Typography className={classes.messengerMessageDate} variant="caption">
        {message.createdDate}
      </Typography>
    </Paper>
  )
}

export default Message;
