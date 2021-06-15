import React from "react";

import { useHistory } from "react-router-dom";

import { NOTIFICATION_ROUTE } from "../../constants/routes";

import { BottomNavigation, BottomNavigationAction, Hidden } from "@material-ui/core";

import AllInboxOutlinedIcon from "@material-ui/icons/AllInboxOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";

import useStyles from "./styles";

function Navbar({ type }) {
  const classes = useStyles();

  const history = useHistory();

  const handleChange = (event, newValue) => {
    history.push(`${NOTIFICATION_ROUTE}/${newValue}`);
  };

  return (
    <>
      <Hidden xsDown>
        <BottomNavigation value={type} onChange={handleChange} showLabels className={classes.navigation}>
          <BottomNavigationAction label="ALL" value="all" icon={<AllInboxOutlinedIcon />} />
          <BottomNavigationAction label="INTERACTIONS" value="interactions" icon={<ChatBubbleOutlineOutlinedIcon />} />
          <BottomNavigationAction label="LIKED" value="liked" icon={<FavoriteBorderOutlinedIcon />} />
          <BottomNavigationAction label="SUBSCRIBED" value="subscribed" icon={<SubscriptionsOutlinedIcon />} />
          <BottomNavigationAction label="TIPPED" value="tipped" icon={<PaymentOutlinedIcon />} />
          <BottomNavigationAction label="PROMOTIONS" value="promotions" icon={<ReportProblemOutlinedIcon />} />
        </BottomNavigation>
      </Hidden>
      <Hidden smUp>
        <BottomNavigation value={type} onChange={handleChange} className={classes.navigation}>
          <BottomNavigationAction value="all" icon={<AllInboxOutlinedIcon />} className={classes.item} />
          <BottomNavigationAction
            value="interactions"
            icon={<ChatBubbleOutlineOutlinedIcon />}
            className={classes.item}
          />
          <BottomNavigationAction value="liked" icon={<FavoriteBorderOutlinedIcon />} className={classes.item} />
          <BottomNavigationAction value="subscribed" icon={<SubscriptionsOutlinedIcon />} className={classes.item} />
          <BottomNavigationAction value="tipped" icon={<PaymentOutlinedIcon />} className={classes.item} />
          <BottomNavigationAction value="promotions" icon={<ReportProblemOutlinedIcon />} className={classes.item} />
        </BottomNavigation>
      </Hidden>
    </>
  );
}

export default Navbar;
