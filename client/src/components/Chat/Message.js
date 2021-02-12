import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, Grid, Paper, Typography } from "@material-ui/core/";

import { formatDate, generateFileUrl } from "../../helpers/functions";

import useStyles from "./styles";

const Message = React.memo(({
  message,
  isOwner,
  liveChat,
  className
}) => {
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.messengerMessage, className, isOwner && classes.messengerMyMessage)}>
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Typography variant="body2" >
          {message.message}
        </Typography>
        <Typography className={classes.messengerMessageDate} variant="caption" component="small">
          {formatDate(message.createdDate)}
        </Typography>
      </Box>
      {message.media.length > 0 &&
        <Grid container spacing={1} className={classes.gridContainer}>
          {message.media.map((file) => (
            <Grid item key={file.id} className={classes.gridItem}>
              <img className={classes.gridItemImage} src={generateFileUrl(process.env.REACT_APP_DOMAIN, file.thumbnailUrl)} />
            </Grid>
          ))}
        </Grid>}
    </Paper>
  );
});

Message.propTypes = {
  message: PropTypes.any,
  isOwner: PropTypes.bool,
  liveChat: PropTypes.any,
  className: PropTypes.any
}

Message.defaultProps = {
  message: {
    message: "",
    createdDate: ""
  },
  isOwner: true,
  liveChat: false,
  className: ""
}

export default Message;
