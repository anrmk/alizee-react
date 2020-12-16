import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Paper, Typography } from "@material-ui/core/";

import {formatDate} from "../../helpers/functions";


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
        {formatDate(message.createdDate)}
      </Typography>
    </Paper>
  )
}

Message.propTypes = {
  message:  PropTypes.any,
  isOwner:  PropTypes.bool,
  liveChat:  PropTypes.any,
  className:  PropTypes.any
}

Message.defaultProps = { 
  message:  {
    message: "",
    createdDate: ""
  },
  isOwner:  true,
  liveChat:  false,
  className:  ""
}

export default Message;
