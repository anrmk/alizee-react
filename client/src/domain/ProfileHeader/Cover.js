import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, IconButton } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import useStyles from "./styles";
import HeaderAvatar from "./HeaderAvatar"

function Cover({
  imageUrl,
  fullName,
  username,
  avatarUrl,
  isOwner,

  onEditCover
}) {
  const classes = useStyles({ imageUrl });

  return (
    <Box className={classes.coverBox}>
      <Box className={classes.cover}>
        <IconButton
          className={clsx(!isOwner && classes.coverEditButton)}
          color="secondary"
          onClick={onEditCover}>
          <EditIcon />
        </IconButton>
      </Box>
      <HeaderAvatar
        fullName={fullName}
        username={username}
        avatarUrl={avatarUrl} />
    </Box>
  );
}

Cover.propTypes = {
  imageUrl: PropTypes.string,
  fullName: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  isOwner: PropTypes.bool,

  onEditCover: PropTypes.func
};

Cover.defaultProps = {
  imageUrl: "",
  fullName: "",
  username: "",
  avatarUrl: "",
  isOwner: false,

  onEditCover: undefined
};

export default Cover;