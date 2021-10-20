import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Typography, Box, Button, IconButton } from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import { CHAT_USERNAME_ROUTE } from "../../constants/routes";
import { isAwaitingConfirmation } from "./utils";
import SubscriptionBtn from "./SubscriptionBtn";
import { customFormatDate } from "../../helpers/functions";

import { BundleList } from "../../components/Bundle";
import { CampaignList, PublicCampaign } from "../../components/Campaign";
import { FOLLOW_ACCEPTED } from "../../constants/follow_types";

import useStyles from "./style";

function ProfileUserInfo({
  user,
  isOwner,
  isVerified,
  subscriptionPrice,
  followStatus,
  disabled,
  subscriptionStatus,

  onSubscribeClick,
  onSendTipClick,
  onDeleteCampaignClick,
}) {
  const classes = useStyles({ isOwner });
  const { t } = useTranslation();
  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  };

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user);
  };

  return (
    <Box display="flex" flexDirection="column" padding={1}>
      {isOwner ? (
        <>
          {user?.campaigns && user.campaigns.length > 0 && (
            <CampaignList
              isProfile
              disabled={disabled}
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
          {user?.campaigns?.length > 0 && subscriptionPrice > 0 && (
            <Box className={classes.btnsGroupMobile}>
              {user.campaigns.map((item) => (
                <PublicCampaign campaign={item}>
                  <Box display="flex">
                    <IconButton
                      color="primary"
                      disabled={
                        !(followStatus === FOLLOW_ACCEPTED) ||
                        isAwaitingConfirmation(followStatus)
                      }
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
              ))}
            </Box>
          )}
          {user?.bundles &&
            user.bundles.length > 0 &&
            subscriptionPrice > 0 && (
              <BundleList
                user={user}
                isProfile
                price={user.subscriptionPrice}
                data={user.bundles}
              />
            )}
          <Box display="flex" alignItems="center" width="100%">
            <SubscriptionBtn
              onSubscribeClick={handleSubscribeClick}
              followStatus={followStatus}
              subscriptionPrice={subscriptionPrice}
              subscriptionStatus={subscriptionStatus}
              subscriptionExpireDate={user.subscriptionExpireDate}
            />

            <IconButton
              color="primary"
              disabled={
                !(followStatus === FOLLOW_ACCEPTED) ||
                isAwaitingConfirmation(followStatus)
              }
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
          {user?.subscriptionExpireDate && (
            <Typography variant="caption" color="textSecondary" component="p">
              Expired {customFormatDate(user.subscriptionExpireDate)}
            </Typography>
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
