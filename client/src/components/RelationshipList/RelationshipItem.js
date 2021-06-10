import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button, Typography, Card, CardContent, CardActionArea, CardMedia } from "@material-ui/core";
import { FOLLOW_ACCEPTED, FOLLOW_PENDING, FOLLOW_REJECTED } from "../../constants/follow_types";
import { USER_RANKING } from "../../constants/user";
import DisplayName from "../DisplayName";

import Avatar from "../Avatar";

import useStyles from "./styles";
import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

const RelationshipItem = React.memo((props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { userName, wide, status, avatarUrl, coverUrl, name, subtitle, ranking, subscriptionPrice, isFollow, isMe, identityVerified } = props;
  const classes = useStyles({ url: coverUrl });

  const { onItemClick, onSubscribeClick, onConfirmClick, onRejectClick, onUnrejectClick } = props;

  const handleSubscribeClick = (e) => {
    e.preventDefault();
    onSubscribeClick && onSubscribeClick({ userName, name, isFollow, subscriptionPrice, avatarUrl });
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    onConfirmClick && onConfirmClick({ userName, status });
  };

  const handleRejectClick = (e) => {
    e.preventDefault();
    onRejectClick && onRejectClick({ userName, status });
  };

  const handleUnrejectClick = (e) => {
    e.preventDefault();
    onUnrejectClick && onUnrejectClick({ userName });
  };

  const renderActionButtons = () => {
    switch (status) {
      case FOLLOW_PENDING:
        return (
          <>
            <Button
              className={classes.itemButton}
              disableElevation
              disableRipple
              size="small"
              variant="contained"
              color="primary"
              onClick={handleConfirmClick}
            >
              {t("ConfirmBtnTextFollowerItem")}
            </Button>

            <Button
              className={classes.itemButton}
              disableElevation
              disableRipple
              size="small"
              color="secondary"
              onClick={handleRejectClick}
            >
              {t("DeclineBtnTextFollowerItem")}
            </Button>
          </>
        );
      case FOLLOW_REJECTED:
        return (
          <Button
            className={classes.itemButton}
            disableElevation
            disableRipple
            size="small"
            color="secondary"
            onClick={handleUnrejectClick}
          >
            {t("UnrejectBtnTextFollowerItem")}
          </Button>
        );

      case FOLLOW_ACCEPTED:
        break;
      default:
        return (
          <Button
            className={classes.itemButton}
            disableElevation
            disableRipple
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSubscribeClick}
          >
            {isFollow ? t("FollowingBtnTextFollowerItem") : t("FollowerBtnTextFollowerItem")}
          </Button>
        );
    }
  };

  return (
    // <ListItem
    //   className={clsx(classes.item, wide && classes.wide)}
    //   button
    //   to={PROFILE_USERNAME_ROUTE(userName)}
    //   component={Link}
    // >
    //   {(!subscriptionPrice || subscriptionPrice === 0) && <Typography className={classes.label}>Free</Typography>}

    //   <ListItemAvatar className={classes.avatar}>
    //     <Avatar borderColor="silver" size={wide && "large"} src={avatarUrl} />
    //   </ListItemAvatar>

    //   <ListItemText
    //     primary={
    //       <Typography noWrap variant="h6">
    //         {name}
    //       </Typography>
    //     }
    //     secondary={
    //       <Typography noWrap variant="body2">
    //         {subtitle}
    //       </Typography>
    //     }
    //     onClick={onItemClick}
    //   />
    //   {/* <Hidden mdDown>
    //     {!isMe && renderActionButtons()}
    //   </Hidden> */}
    // </ListItem>
    <Card className={classes.root} onClick={() => history.push(PROFILE_USERNAME_ROUTE(userName))}>
      {/* {(!subscriptionPrice || subscriptionPrice === 0) && <Typography className={classes.label}>Free</Typography>} */}
      <CardActionArea>
        <CardMedia component="img" image={coverUrl} height="128" className={classes.media}></CardMedia>
        <CardContent  className={classes.content}>
          {/* <Typography variant="h6" component="h2" >{name} </Typography> */}
          <DisplayName  name={name} identityVerified={identityVerified} />
          <Typography variant="body1" component="p">{subtitle}</Typography>
        </CardContent>
        <Avatar borderColor="silver" size={wide && "big"} src={avatarUrl} className={classes.avatar} />

      </CardActionArea>
      
    </Card>

  );
});

export default RelationshipItem;
