import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  ButtonBase,
  IconButton
} from "@material-ui/core";

import InfoIcon from "@material-ui/icons/InfoOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined';

import { PROFILE_ROUTE } from "../../constants/routes";
import Avatar from "../../components/Avatar";
import useStyles from "./styles";

function ChatRoomToolbar({
  name,
  username,
  avatarUrl,
  online,
  lastOnlineDate,

  onCloseClick
}) {
  const classes = useStyles();

  return (
    <Box className={classes.roomToolbarRoot}>
      <Box className={classes.roomToolbarLeftPart}>
        <IconButton onClick={onCloseClick}>
          <ArrowBackIcon />
        </IconButton>
        <ButtonBase className={classes.infoRoomToolbar} to={PROFILE_ROUTE(username)} component={Link}>
          <Avatar
            variant="badge"
            size="upperMedium"
            online={online}
            src={avatarUrl}
            avatarBaseProps={{ variant: "circular" }}
            badgeClassName={classes.avatarToolbar}
            badgeProps={{
              overlap: "circle",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right"
              },
              variant: "dot"
            }} />
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography className={classes.nameToolbar} variant="body1">
              {name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {!online && new Date(lastOnlineDate).toDateString()}
            </Typography>
          </Box>
        </ButtonBase>
      </Box>
      <Box className={classes.roomToolbarRightPart}>
        <IconButton>
          <InfoIcon />
        </IconButton>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatRoomToolbar;
