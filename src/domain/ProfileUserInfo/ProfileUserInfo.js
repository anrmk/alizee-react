import React, { useRef } from "react";
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
import { isAwaitingConfirmation } from "./utils";
import DisplayName from "../../components/DisplayName";
import SubscriptionBtn from "./SubscriptionBtn";
import { FOLLOW_ACCEPTED } from "../../constants/follow_types";
import { customFormatDate } from "../../helpers/functions";

import useStyles from "./style";
import { BundleList } from "../../components/Bundle";
import { CampaignList, PublicCampaign } from "../../components/Campaign";

function ProfileUserInfo({
  user,
  isOwner,
  followStatus,
  isVerified,
  subscriptionPrice,
  sites,
  disabled,
  subscriptionStatus,

  onSubscribeClick,
  onSendTipClick,
  onMoodUpdateClick,
  onNewAvatarImageClick,
  onDeleteAvatarImageClick,
  onAvatarUrlChange,
  onClick,
  onDeleteCampaignClick,
  onMenuClick,
}) {
  const fileInputEl = useRef(null);
  const classes = useStyles({ isOwner });

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  };

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user);
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

      {user?.campaigns && user.campaigns.length > 0 && isOwner && (
        <CampaignList
          price={user.subscriptionPrice}
          disabled={disabled}
          isProfile
          data={user.campaigns}
          onDelete={onDeleteCampaignClick}
        />
      )}
      {user?.campaigns?.length > 0 && !isOwner && subscriptionPrice > 0 && (
        <Card>
          {user.campaigns.map((item) => (
            <CardContent key={`campaign_${item.id}`}>
              <PublicCampaign campaign={item} />
            </CardContent>
          ))}
        </Card>
      )}

      {user?.bundles &&
        subscriptionPrice > 0 &&
        user.bundles.length > 0 &&
        !isOwner && (
          <BundleList
            user={user}
            isProfile
            price={user.subscriptionPrice}
            disabled={disabled}
            data={user.bundles}
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
              <SubscriptionBtn
                onSubscribeClick={handleSubscribeClick}
                followStatus={followStatus}
                subscriptionPrice={subscriptionPrice}
                subscriptionStatus={subscriptionStatus}
                subscriptionExpireDate={user.subscriptionExpireDate}
                onMenuClick={onMenuClick}
              />
              {user?.subscriptionExpireDate && (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p">
                  Expired {customFormatDate(user.subscriptionExpireDate)}
                </Typography>
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
                  disabled={
                    !(followStatus === FOLLOW_ACCEPTED) ||
                    isAwaitingConfirmation(followStatus)
                  }
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
