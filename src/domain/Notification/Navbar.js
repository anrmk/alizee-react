import React from "react";
import { useHistory } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AllInboxOutlinedIcon from "@material-ui/icons/AllInboxOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import { NOTIFICATION_ID_ROUTE } from "../../constants/routes";

import useViewport from "../../hooks/useViewport";

import useStyles from "./styles";

function Navbar({ type }) {
  const classes = useStyles();

  const history = useHistory();
  const { up } = useViewport();

  const handleChange = (e, newValue) => {
    history.push(NOTIFICATION_ID_ROUTE(newValue));
  };

  return (
    <BottomNavigation
      value={type}
      onChange={handleChange}
      showLabels={up("md")}
      className={classes.navbar}>
      <BottomNavigationAction
        label="All"
        value="all"
        icon={<AllInboxOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Interactions"
        value="interaction"
        icon={<ChatBubbleOutlineOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Liked"
        value="liked"
        icon={<FavoriteBorderOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Subscribed"
        value="subscribed"
        icon={<SubscriptionsOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Tipped"
        value="tipped"
        icon={<PaymentOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Promotions"
        value="promotions"
        icon={<ReportProblemOutlinedIcon />}
      />
    </BottomNavigation>
  );
}

export default Navbar;
