import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { Box, ListItem, ListItemAvatar, ListItemText, Typography, IconButton, Button } from "@material-ui/core";
import Avatar from "../../components/Avatar";

import CloseIcon from "@material-ui/icons/CloseRounded";
import CallIcon from "@material-ui/icons/CallRounded";

import { PEAR_TO_PEAR_ID_ROUTE, POST_ID_ROUTE, PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./style";

export default function Snackbar({ 
  id,
  name,
  userName,
  description,
  avatarUrl,
  relatedPostId,
  isCallable,
  onOpen,
  onCall,
  onClose
}) {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const history = useHistory();

  const handleCloseClick = (e) => {
    closeSnackbar();
    onClose && onClose(e);
  }

  const handleCallClick = (e) => {
    history.push(PEAR_TO_PEAR_ID_ROUTE(userName));
    onCall && onCall(e);
  }

  const handleOpenClick = (e) => {
    history.push(POST_ID_ROUTE(relatedPostId));
    onOpen && onOpen(e);
  }

  return (
    <Box className={classes.rootContainer}>
      <ListItem id={id}>
        <ListItemAvatar>
          <Box to={PROFILE_USERNAME_ROUTE(userName)} component={Link}>
            <Avatar borderColor="silver" src={avatarUrl} />
          </Box>
        </ListItemAvatar>
        <ListItemText 
          primary={(
            <Box display="flex">
              <Typography noWrap variant="body1" className={classes.name}>
                {name}
              </Typography>
              <Typography noWrap variant="body1" className={classes.userName}>
                @{userName}
              </Typography>
            </Box>
          )}
          secondary={relatedPostId ? (
              <Typography
                noWrap
                variant="body2"
                className={classes.description}>
                {description}
              </Typography>
            ) : (
              <Typography noWrap variant="body2" className={classes.description}>
                {description}
              </Typography>
          )} />
          <Box marginLeft={(2)} display="flex">
            {relatedPostId && (
              <Button
                size="small"
                variant="outlined"
                onClick={handleOpenClick}>
                Open
              </Button>
            )}
            {isCallable && (
              <IconButton
                size="small"
                onClick={handleCallClick}>
                <CallIcon htmlColor="white" />
              </IconButton>
            )}
            <IconButton
              size="small"
              onClick={handleCloseClick}>
              <CloseIcon htmlColor="white" />
            </IconButton>
          </Box>
      </ListItem>
    </Box>
  )
}
