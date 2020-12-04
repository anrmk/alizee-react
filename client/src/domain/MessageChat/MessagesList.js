import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Box, Paper, Typography } from "@material-ui/core/";

import useStyles from "./styles";

function MessagesList({
  userId,
  items,
}) {
  const classes = useStyles();
  const messageContainer = useRef(null);

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [items])

  const renderMessage = (id, text, date, owner) => (
    <Paper
      key={id}
      className={clsx(classes.messengerMessage, owner && classes.messengerMyMessage)}>
      <Typography variant="body2" gutterBottom>
        {text}
      </Typography>
      <Typography className={classes.messengerMessageDate} variant="caption">
        {date}
      </Typography>
    </Paper>
  )

  return (
    <Box className={classes.messenger} ref={messageContainer}>
      {items && items.map((msg) => {
        const isOwner = msg.userId == userId;
        return renderMessage(msg.id, msg.message, msg.createdDate, isOwner);
      })}
    </Box>
  )
}

export default MessagesList;
