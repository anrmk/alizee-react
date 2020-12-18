import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import useStyles from "./styles";
import Avatar from "../../components/Avatar";

function HeaderAvatar({
  fullName,
  username,
  avatarUrl
}) {
  const classes = useStyles();

  return (
    <Box className={classes.headerAvatarBox}>
      <Avatar
        src={avatarUrl}
        size="extraLarge" />
      <Box className={classes.headerAvatarDescription}>
        <Box className={classes.headerAvatarFullNameBox}>
          <Typography variant="subtitle2" className={classes.headerAvatarFullName}>
            {fullName}
          </Typography>
          <CheckCircleOutlineIcon
            className={classes.headerAvatarFullNameIcon}
            color="primary" />
        </Box>
        <Typography variant="caption" className={classes.headerAvatarUsername}>
          {username}
        </Typography>
      </Box>
    </Box>
  );
}

HeaderAvatar.propTypes = {
  fullName: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string
};

HeaderAvatar.defaultProps = {
  fullName: "",
  username: "",
  avatarUrl: ""
};

export default HeaderAvatar;