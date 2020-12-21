import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";

import { PostSprout } from "../../domain/PostsList";
import Cover from "./Cover";

import useStyles from "./styles";

function ProfileHeader({
  me,
  fullName,
  username,
  avatarUrl,

  feeling,

  onPostCreate,
  onEditCover,
}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12}>
        {/* TODO Add props IsOwner and Image URL */}
        <Cover
          fullName={fullName}
          username={username}
          avatarUrl={avatarUrl}
          onEditCover={onEditCover} />
      </Grid>
      <Grid container item className={classes.feeling} xs={12}>
        <Grid item xs={5} ></Grid>
        <Grid item xs={7} >
          <Typography noWrap variant="subtitle2">
            {feeling}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8}>
        <PostSprout user={{ avatar: { avatarUrl } }} onSubmit={onPostCreate} variant="fab" />
      </Grid>
    </Grid>
  );
}

ProfileHeader.propTypes = {
  me: PropTypes.bool,
  fullName: PropTypes.string,
  username: PropTypes.string,
  followed: PropTypes.bool,
  avatarUrl: PropTypes.string,

  feeling: PropTypes.string,

  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onSettingsClick: PropTypes.func,
};

ProfileHeader.defaultProps = {
  me: false,
  fullName: "",
  username: "",
  followed: false,
  avatarUrl: "",

  feeling: "",

  onMessageClick: undefined,
  onFollowClick: undefined,
  onEditClick: undefined,
  onSettingsClick: undefined,
};

export default ProfileHeader;
