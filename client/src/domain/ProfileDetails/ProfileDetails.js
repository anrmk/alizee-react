import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { BottomNavigation, BottomNavigationAction, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";

import LinkIcon from "@material-ui/icons/Link";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import RedditIcon from "@material-ui/icons/Reddit";
import SendIcon from "@material-ui/icons/SendOutlined";
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import TwitterIcon from "@material-ui/icons/Twitter";

import { getHostFromUrl } from "../../helpers/functions";
import ProfileGeneralStatistics from "../../components/ProfileGeneralStatistics"
import Details from "./Details"
import useStyles from "./styles";

function ProfileDetails({
  location,
  offlineDate,
  hourlyRate,

  username,
  postCount,
  followerCount,
  followingCount,

  bio,
  sites,

  onMessageClick,
  onFollowClick,
  onSendGiftClick
}) {
  const classes = useStyles();
  const { t } = useTranslation();

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
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Details
          location={location}
          offlineDate={offlineDate}
          hourlyRate={hourlyRate}
          onSendGiftClick={onSendGiftClick} />
        <ProfileGeneralStatistics
          className={classes.profileGeneralStatistics}
          username={username}
          postCount={postCount}
          followerCount={followerCount}
          followingCount={followingCount}
        />
        <BottomNavigation showLabels className={classes.profileDetailsActionButtons}>
          <BottomNavigationAction
            className={classes.profileDetailsActionButton}
            label={t("ProfileProfileDetailsFollowButtonLabel")}
            onClick={onFollowClick}
            icon={<ToggleOnIcon />} />
          <BottomNavigationAction
            className={classes.profileDetailsActionButton}
            label={t("ProfileProfileDetailsSendMessageButtonLabel")}
            onClick={onMessageClick}
            icon={<SendIcon />} />
        </BottomNavigation>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body2" className={classes.profileDetailsBio}>
          {bio} 
        </Typography>
        <div className={classes.profileDetailsSites}>
          {sites.length > 0 &&
            sites.map((url, i) => (
              <Tooltip key={i} title={getHostFromUrl(url)} placement="top">
                <IconButton key={i} onClick={(e) => window.open(url)}>
                  {generateSiteIcon(url)}
                </IconButton>
              </Tooltip>
            ))}
        </div>
      </Grid>
    </Grid>
  );
}

ProfileDetails.propTypes = {
  location: PropTypes.string,
  offlineDate: PropTypes.string,
  hourlyRate: PropTypes.number,

  username: PropTypes.string,
  postCount: PropTypes.number,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,

  bio: PropTypes.string,
  sites: PropTypes.array,

  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
  onSendGiftClick: PropTypes.func
};

ProfileDetails.defaultProps = {
  location: "",
  offlineDate: null,
  hourlyRate: 0,

  username: "",
  postCount: 0,
  followerCount: 0,
  followingCount: 0,

  bio: "",
  sites: [],

  onMessageClick: undefined,
  onFollowClick: undefined,
  onSendGiftClick: undefined
};

export default ProfileDetails;