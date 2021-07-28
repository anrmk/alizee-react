import React from "react";
import { useHistory } from "react-router-dom";

import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import DisplayName from "../DisplayName";
import Avatar from "../Avatar";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./styles";

function ProfileCard({
  userName,
  name,
  avatarUrl,
  coverUrl,
  subtitle,
  subscriptionPrice,
  identityVerified,
}) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onClick={() => history.push(PROFILE_USERNAME_ROUTE(userName))}>
      <CardActionArea>
        <CardMedia component="img" image={coverUrl} className={classes.media} />
        <CardContent className={classes.content}>
          <DisplayName name={name} identityVerified={identityVerified} />
          <Typography variant="subtitle2" component="p">
            {subtitle ?? `@${userName}`}
          </Typography>
        </CardContent>
        <Avatar
          borderColor="silver"
          size="big"
          src={avatarUrl}
          className={classes.avatar}
        />
        {(!subscriptionPrice || subscriptionPrice === 0) && (
          <Typography className={classes.label}>Free</Typography>
        )}
      </CardActionArea>
    </Card>
  );
}

export default ProfileCard;
