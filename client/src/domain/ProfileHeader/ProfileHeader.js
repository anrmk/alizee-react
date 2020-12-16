import React from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { Avatar, Grid, Paper, Typography, Chip } from "@material-ui/core";

import LinkIcon from "@material-ui/icons/Link";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import RedditIcon from "@material-ui/icons/Reddit";
import TwitterIcon from "@material-ui/icons/Twitter";

import { PostSprout } from "../../domain/PostsList";

import { getHostFromUrl } from "../../helpers/functions";
import Statistics from "./Statistics";

import useStyles from "./styles";

function ProfileHeader({
  me,
  fullName,
  username,
  bio,
  sites,
  avatarUrl,

  postsCount,
  followersCount,
  followingCount,

  onEditClick,
  onMessageClick,
  onFollowClick,
  onSettingsClick,
  onPostCreate,
}) {
  const classes = useStyles();
  const history = useHistory();

  const generateSiteIcon = (link) => {
    if (link.includes("instagram.com")) {
      return <InstagramIcon />;
    } else if (link.includes("facebook.com")) {
      return <FacebookIcon />;
    } else if (link.includes("linkedin.com")) {
      return <LinkedInIcon />;
    } else if (link.includes("reddit.com")) {
      return <RedditIcon />;
    } else if (link.includes("twitter.com")) {
      return <TwitterIcon />;
    } else {
      return <LinkIcon />;
    }
  };

  return (
    <Grid container spacing={2} direction="row">
      <Grid container item xs={12} sm={4} direction="column" justify="space-between" alignItems="center">
        <Avatar variant="circular" src={avatarUrl} className={classes.large} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Statistics
          username={username}
          postsCount={postsCount}
          followersCount={followersCount}
          followingCount={followingCount}
        />
        {/* Bio */}
        <Typography variant="body2" className={classes.bio}>
          {bio}
        </Typography>

        {/* Sites */}
        <div className={classes.sites}>
          {sites.length > 0 &&
            sites.map((url, i) => (
              <Chip
                key={i}
                color="primary"
                size="small"
                icon={generateSiteIcon(url)}
                label={getHostFromUrl(url)}
                onClick={(e) => window.open(url)}
              ></Chip>
            ))}
        </div>

        <PostSprout user={{ avatar: { avatarUrl } }} onSubmit={onPostCreate} variant="fab"/>
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

  bio: PropTypes.string,
  sites: PropTypes.array,

  postsCount: PropTypes.number,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,

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

  bio: "",
  sites: [],

  postsCount: 0,
  followersCount: 0,
  followingCount: 0,

  onMessageClick: undefined,
  onFollowClick: undefined,
  onEditClick: undefined,
  onSettingsClick: undefined,
};

export default ProfileHeader;
