import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
  Divider,
  Box,
} from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import { CHAT_USERNAME_ROUTE } from "../../constants/routes";
import SocialControl from "../../components/Social";
import { getSubscriptionBtnText, isAwaitingConfirmation } from "./utils";
import DisplayName from "../../components/DisplayName";

import useStyles from "./style";
import { BundleList } from "../../components/Bundle";
import { CampaignList, PublicCampaign } from "../../components/Campaign";

function ProfileUserInfo({
  user,
  isOwner,
  isFollow,
  isVerified,
  subscriptionPrice,
  followStatus,
  sites,
  campaign,

  onSubscribeClick,
  onSendTipClick,
  onMoodUpdateClick,
  onNewAvatarImageClick,
  onDeleteAvatarImageClick,
  onAvatarUrlChange,
  onClick,
  onDeleteCampaignClick,
}) {
  const fileInputEl = useRef(null);
  const classes = useStyles({ isOwner });
  const { t } = useTranslation();

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  };

  const handleSubscribeClick = (e, data = user) => {
    onSubscribeClick && onSubscribeClick(data);
  };

  const handleNewImageClick = () => {
    fileInputEl.current.click();

    onNewAvatarImageClick && onNewAvatarImageClick();
  };

  const handleAvatarUrlChange = () => {
    const { files } = fileInputEl.current;

    if (files.length === 1) {
      onAvatarUrlChange && onAvatarUrlChange(files[0]);
    }
  };

  const renderFileInput = () => (
    <input
      hidden
      type="file"
      name="avatarUrl"
      ref={fileInputEl}
      onChange={handleAvatarUrlChange}
    />
  );

  const renderChangeImg = () => {
    if (isOwner) {
      return user.avatarUrl ? (
        <CardActionArea onClick={handleNewImageClick}>
          <CardMedia
            component="img"
            alt={user.name}
            image={user.avatarUrl}
            title={user.name}
          />
          {renderFileInput()}
        </CardActionArea>
      ) : (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button
            disableElevation
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleNewImageClick}>
            Load avatar
            {renderFileInput()}
          </Button>
        </Box>
      );
    }
    return user.avatarUrl ? (
      <CardMedia
        component="img"
        alt={user.name}
        image={user.avatarUrl}
        title={user.name}
      />
    ) : null;
  };
  return (
    <>
      <Card>
        {renderChangeImg()}
        <CardHeader
          className={classes.cardHeader}
          title={
            <DisplayName
              name={user.name}
              userName={user.userName}
              identityVerified={user.identityVerified}
              noWrap={false}
            />
          }
          subheader={
            isOwner ? (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.mood}
                onClick={onMoodUpdateClick}
                align="justify">
                {user.mood ? user.mood : isOwner && "What's on your mind?"}
              </Typography>
            ) : (
              user.mood && (
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="justify"
                  className={classes.breakText}
                  component="p">
                  {user.mood}
                </Typography>
              )
            )
          }
        />
      </Card>

      {user?.campaigns &&
        user.campaigns.length > 0 &&
        isOwner &&
        !followStatus && (
          <CampaignList
            isProfile
            data={user.campaigns}
            onDelete={onDeleteCampaignClick}
          />
        )}
      {user?.campaigns?.length > 0 && !isOwner && (
        <Card>
          <CardContent>
            <PublicCampaign
              user={user}
              campaign={campaign}
              price={user.subscriptionPrice}
              followStatus={followStatus}
              getSubscriptionBtnText={getSubscriptionBtnText}
              t={t}
              onClick={handleSubscribeClick}
            />
          </CardContent>
        </Card>
      )}

      {user?.bundles &&
        user.bundles.length > 0 &&
        !followStatus &&
        !isOwner && (
          <BundleList
            user={user}
            isProfile
            price={user.subscriptionPrice}
            data={user.bundles}
            onSubscribeClick={handleSubscribeClick}
          />
        )}

      <Card>
        <CardContent className={classes.content}>
          {isOwner ? (
            <>
              <Button
                disableElevation
                size="large"
                color="primary"
                variant="contained"
                to="statistics"
                component={Link}
                className={classes.btnMargin}>
                Statistics
              </Button>
            </>
          ) : (
            <>
              {!user?.campaigns?.length > 0 && (
                <Button
                  className={classes.subscribeBtn}
                  disableElevation
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handleSubscribeClick}>
                  {getSubscriptionBtnText(followStatus, subscriptionPrice, t)}
                </Button>
              )}

              <Box
                width="100%"
                display="flex"
                marginTop={2}
                marginBottom={2}
                flexDirection="column">
                <Button
                  fullWidth
                  disableElevation
                  disabled={!isFollow || isAwaitingConfirmation(followStatus)}
                  size="large"
                  color="secondary"
                  variant="contained"
                  endIcon={<MessageIcon />}
                  to={CHAT_USERNAME_ROUTE(user.userName)}
                  component={Link}
                  className={classes.btnMargin}>
                  Message
                </Button>
                {isVerified && (
                  <Button
                    fullWidth
                    disableElevation
                    size="large"
                    color="secondary"
                    variant="contained"
                    endIcon={<DollarIcon />}
                    onClick={handleSendTipClick}>
                    Send Tip
                  </Button>
                )}
              </Box>
            </>
          )}

          <Typography variant="body1" align="justify">
            {user.bio}
          </Typography>
        </CardContent>
        {sites?.length > 0 && (
          <>
            <Divider />
            <CardActions>
              <SocialControl urls={sites} onClick={onClick} />
            </CardActions>
          </>
        )}
      </Card>
    </>
  );
}

export default ProfileUserInfo;
