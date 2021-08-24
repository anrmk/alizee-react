import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Typography, Box, Button, IconButton } from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import { CHAT_USERNAME_ROUTE } from "../../constants/routes";
import { getSubscriptionBtnText, isAwaitingConfirmation } from "./utils";

import { BundleList } from "../../components/Bundle";
import { CampaignList, PublicCampaign } from "../../components/Campaign";

import useStyles from "./style";

function ProfileUserInfo({
  user,
  isOwner,
  isVerified,
  isFollow,
  subscriptionPrice,
  followStatus,
  campaign,

  onSubscribeClick,
  onSendTipClick,
  onDeleteCampaignClick,
}) {
  const classes = useStyles({ isOwner });
  const { t } = useTranslation();

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  };

  const handleSubscribeClick = (e, data = user) => {
    onSubscribeClick && onSubscribeClick(data);
  };

  return (
    <Box display="flex" flexDirection="column" padding={1}>
      {isOwner ? (
        <>
          {user?.campaigns && user.campaigns.length > 0 && !followStatus && (
            <CampaignList
              isProfile
              data={user.campaigns}
              onDelete={onDeleteCampaignClick}
            />
          )}
          <Button
            disableElevation
            color="primary"
            variant="contained"
            to="statistics"
            component={Link}>
            Statistics
          </Button>
        </>
      ) : (
        <>
          <Box className={classes.btnsGroupMobile}>
            {user?.campaigns?.length > 0 && (
              <PublicCampaign
                campaign={campaign}
                price={user.subscriptionPrice}
                followStatus={followStatus}
                getSubscriptionBtnText={getSubscriptionBtnText}
                t={t}
                onClick={handleSubscribeClick}>
                <Box display="flex">
                  <IconButton
                    color="primary"
                    disabled={!isFollow || isAwaitingConfirmation(followStatus)}
                    to={CHAT_USERNAME_ROUTE(user.userName)}
                    component={Link}>
                    <MessageIcon />
                  </IconButton>
                  {isVerified && (
                    <IconButton color="primary" onClick={handleSendTipClick}>
                      <DollarIcon />
                    </IconButton>
                  )}
                </Box>
              </PublicCampaign>
            )}
            {!user?.campaigns?.length > 0 && (
              <>
                <Button
                  fullWidth
                  disableElevation
                  color="primary"
                  variant="contained"
                  onClick={handleSubscribeClick}>
                  {getSubscriptionBtnText(followStatus, subscriptionPrice, t)}
                </Button>

                <IconButton
                  color="primary"
                  disabled={!isFollow || isAwaitingConfirmation(followStatus)}
                  to={CHAT_USERNAME_ROUTE(user.userName)}
                  component={Link}>
                  <MessageIcon />
                </IconButton>
                {isVerified && (
                  <IconButton color="primary" onClick={handleSendTipClick}>
                    <DollarIcon />
                  </IconButton>
                )}
              </>
            )}
          </Box>

          {user?.bundles && user.bundles.length > 0 && !followStatus && (
            <BundleList
              isProfile
              price={user.subscriptionPrice}
              data={user.bundles}
              onSubscribeClick={handleSubscribeClick}
            />
          )}
        </>
      )}

      {user.mood && (
        <Box marginTop={2}>
          <Typography
            variant="caption"
            color="textSecondary"
            align="justify"
            className={classes.breakText}
            component="p">
            {user.mood}
          </Typography>
        </Box>
      )}
      {user.bio && (
        <Box marginTop={2}>
          <Typography variant="body1" align="justify">
            {user.bio}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ProfileUserInfo;
