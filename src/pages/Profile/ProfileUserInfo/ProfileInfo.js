import React from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Box,
  Hidden,
} from "@material-ui/core/";

import useStyles from "./style";

import { BundleList } from "../../../components/Bundle";
import CampaignList from "../../../components/Campaign";
import ProfileInteractButtons from "./ProfileInteractButtons";
import SocialControl from "../../../components/Social";
import RedirectContent from "./RedirectContent";

const ProfileInfo = ({
  user,
  disabled,
  isOwner,

  onDeleteCampaignClick,
  onMenuClick,
  onSubscribeClick,
  onSendTipClick,
  onClick,
}) => {
  const classes = useStyles();
  const {
    campaigns,
    mood,
    bio,
    subscriptionPrice,
    bundles,
    followStatus,
    subscriptionStatus,
    subscriptionExpireDate,
    identityVerified: isVerified,
    sites,
  } = user;

  const handleUserMenuClick = () => {
    onMenuClick && onMenuClick({ data: user });
  };

  const handleGoToSocialClick = (link) => {
    onClick(
      {
        mainBtnText: "Link",
        title: "Leaving TheMembers",
        onMainClick: () => window.open(link, "_blank"),
      },
      {
        contentText: <RedirectContent link={link} />,
      }
    );
  };

  return (
    <>
      {isOwner ? (
        <>
          {campaigns && campaigns.length > 0 && (
            <CampaignList
              price={subscriptionPrice}
              disabled={disabled}
              isProfile
              data={campaigns}
              onDelete={onDeleteCampaignClick}
              isOwner={isOwner}
            />
          )}
          {bundles && subscriptionPrice > 0 && bundles.length > 0 && (
            <BundleList
              user={user}
              isProfile
              price={user.subscriptionPrice}
              disabled={disabled}
              data={user.bundles}
            />
          )}
          <Card>
            <CardContent>
              <Button
                fullWidth
                disableElevation
                size="large"
                color="primary"
                variant="contained"
                to="statistics"
                component={Link}
                className={classes.btnMargin}>
                Statistics
              </Button>
              {mood && (
                <Hidden mdUp>
                  <Box marginBottom={bio ? 2 : 0} marginTop={2}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      align="justify"
                      className={classes.breakText}
                      component="p">
                      {mood}
                    </Typography>
                  </Box>
                </Hidden>
              )}

              {bio && (
                <Typography variant="body1" align="justify">
                  {bio}
                </Typography>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {campaigns && campaigns.length > 0 && subscriptionPrice > 0 && (
            <CampaignList
              price={subscriptionPrice}
              disabled={disabled}
              isProfile
              data={campaigns}
              onDelete={onDeleteCampaignClick}
              isOwner={isOwner}
            />
          )}
          {bundles && subscriptionPrice > 0 && bundles.length > 0 && (
            <BundleList
              user={user}
              isProfile
              price={user.subscriptionPrice}
              disabled={disabled}
              data={user.bundles}
            />
          )}
          <Card>
            <CardContent>
              <ProfileInteractButtons
                user={user}
                followStatus={followStatus}
                subscriptionStatus={subscriptionStatus}
                subscriptionExpireDate={subscriptionExpireDate}
                isVerified={isVerified}
                onMenuClick={handleUserMenuClick}
                onSubscribeClick={onSubscribeClick}
                onSendTipClick={onSendTipClick}
              />

              {mood && (
                <Hidden mdUp>
                  <Box marginTop={2}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      align="justify"
                      className={classes.breakText}
                      component="p">
                      {mood}
                    </Typography>
                  </Box>
                </Hidden>
              )}

              {bio && (
                <Typography
                  variant="body1"
                  align="justify"
                  className={classes.bio}>
                  {bio}
                </Typography>
              )}

              {sites?.length > 0 && (
                <Hidden smDown>
                  <Divider />
                  <CardActions>
                    <SocialControl
                      urls={sites}
                      onClick={handleGoToSocialClick}
                    />
                  </CardActions>
                </Hidden>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default ProfileInfo;
