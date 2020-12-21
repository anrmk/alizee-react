import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { FOLLOWERS_ROUTE, FOLLOWINGS_ROUTE } from "../../constants/routes";

import { Link, Grid, Divider, Typography } from "@material-ui/core";

function ProfileGeneralStatistics({
  username,
  postsCount, 
  followersCount, 
  followingCount,
  className
}) {
  const { t } = useTranslation();

  return (
    <Grid container alignItems="center" justify="space-evenly" direction="row" className={className} spacing={1}>
      <Grid item>
        <Typography variant="caption">{t("ComponentsProfileGeneralStatisticsPostsLabel")}</Typography>
        <Typography>{postsCount}</Typography>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <Link href={FOLLOWERS_ROUTE(username)} variant="caption">
        {t("ComponentsProfileGeneralStatisticsFollowersLabel")}
          </Link>
        <Typography>{followersCount}</Typography>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <Link href={FOLLOWINGS_ROUTE(username)} variant="caption">
        {t("ComponentsProfileGeneralStatisticsFollowingLabel")}
          </Link>
        <Typography>{followingCount}</Typography>
      </Grid>
    </Grid>
  );
}

ProfileGeneralStatistics.propTypes = {
  username: PropTypes.string,
  postsCount: PropTypes.number,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,
  className: PropTypes.string
};

ProfileGeneralStatistics.defaultProps = {
  username: "",
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
  className: null
};

export default ProfileGeneralStatistics;
