import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import { Switch, useParams, useHistory, useLocation } from "react-router-dom";
import { List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon,  Card, Divider, Box, Switch as SwitchButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRightOutlined";
import NightIcon from "@material-ui/icons/NightsStayOutlined";

import {
  SETTINGS_BLACK_LIST_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
  SETTINGS_CARD_ROUTE,
  SETTINGS_BANK_ROUTE,
  SETTINGS_NOTIFICATIONS_ROUTE,
  SETTINGS_NOTIFICATIONS_PUSH_ROUTE,
  SETTINGS_NOTIFICATIONS_EMAIL_ROUTE,
  SETTINGS_NOTIFICATIONS_SITE_ROUTE,
  SETTINGS_NOTIFICATIONS_TOAST_ROUTE,
  SETTINGS_PRIVACY_SECURITY_ROUTE,
  SETTINGS_ACCOUNT_ROUTE,
  SETTINGS_SUBSCRIPTION_ROUTE,
} from "../../constants/routes";

import PrivateRoute from "../PrivateRoute";
import SlidingViews from "../../components/SlidingViews";
import BlackList from "./BlackList";
import EditProfileSettings from "./EditProfileSettings";
import EditAccountSettings from "./EditAccountSettings";
import EditCardSettings from "./EditCardSettings";
import EditSubscriptionSettings from "./EditSubscriptionSettings";
import EditBankSettings from "./EditBankSettings";
import PrivacySecuritySettings from "./PrivacySecuritySettings";

import {
  GeneralNotificationSettings,
  PushNotificationSettings,
  EmailNotificationSettings,
  SiteNotificationSettings,
  ToastNotificationSettings,
} from "./Notifications";

import useSlidingViews, { RIGHT_OPEN_TYPE } from "../../hooks/useSlidingViews";
import useChangeTheme from "../../hooks/useChangeTheme";
import { resetSettings } from "../../store/actions/settings";

const TABS = [
  {
    index: 0,
    name: "edit-profile",
    title: "Profile",
    route: SETTINGS_EDIT_PROFILE_ROUTE,
  },
  {
    index: 1,
    name: "account",
    title: "Account",
    route: SETTINGS_ACCOUNT_ROUTE,
  },
  {
    index: 2,
    name: "card",
    title: "Your Cards",
    route: SETTINGS_CARD_ROUTE,
  },
  {
    index: 3,
    name: "bank",
    title: "Banking",
    route: SETTINGS_BANK_ROUTE,
  },
  {
    index: 4,
    name: "subscription",
    title: "Subscription",
    route: SETTINGS_SUBSCRIPTION_ROUTE,
  },
  {
    index: 5,
    name: "notifications",
    title: "Notifications",
    route: SETTINGS_NOTIFICATIONS_ROUTE,
  },
  {
    index: 6,
    name: "privacy-security",
    title: "Privacy and Safity",
    route: SETTINGS_PRIVACY_SECURITY_ROUTE,
  },
];

function Settings() {
  const { type } = useParams();
  const { currentSlidingViewsState, toggleSlidingViewsState } = useSlidingViews(RIGHT_OPEN_TYPE);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const theme = useChangeTheme();

  useEffect(() => {
    if (type) {
      toggleSlidingViewsState();
    }
  }, [type]);

  useEffect(() => () => dispatch(resetSettings()), []);

  return (
    <SlidingViews mobileOnly currentState={currentSlidingViewsState} firstSize={4} secondSize={8}>
      <Card>
        <List disablePadding component="nav" subheader={<ListSubheader>Settings</ListSubheader>}>
          {TABS.map((tab) => (
            <Box key={`settings_${tab.index}`}>
              <ListItem button selected={location.pathname.includes(tab.route)} onClick={() => history.push(tab.route)}>
                <ListItemText primary={tab.title} />
                <ChevronRightIcon />
              </ListItem>
              <Divider component="li" />
            </Box>
          ))}
          <ListItem>
            <ListItemIcon>
              <NightIcon />
            </ListItemIcon>
            <ListItemText id="switch-theme-label" primary={t("NavbarMenuItemDarkMode")} />
            <ListItemSecondaryAction>
              <SwitchButton
                edge="end"
                onChange={() => theme.toggle()}
                checked={theme.currentTheme === "dark"}
                inputProps={{ "aria-labelledby": "switch-theme-label" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li" />
        </List>
      </Card>

      <Box>
        <Switch>
          <PrivateRoute exact path={SETTINGS_EDIT_PROFILE_ROUTE} component={EditProfileSettings} />
          <PrivateRoute exact path={SETTINGS_ACCOUNT_ROUTE} component={EditAccountSettings} />
          <PrivateRoute exact path={SETTINGS_CARD_ROUTE} component={EditCardSettings} />
          <PrivateRoute exact path={SETTINGS_BANK_ROUTE} component={EditBankSettings} />
          <PrivateRoute exact path={SETTINGS_SUBSCRIPTION_ROUTE} component={EditSubscriptionSettings} />

          <PrivateRoute exact path={SETTINGS_NOTIFICATIONS_ROUTE} component={GeneralNotificationSettings} />
          <PrivateRoute exact path={SETTINGS_NOTIFICATIONS_PUSH_ROUTE} component={PushNotificationSettings} />
          <PrivateRoute exact path={SETTINGS_NOTIFICATIONS_EMAIL_ROUTE} component={EmailNotificationSettings} />
          <PrivateRoute exact path={SETTINGS_NOTIFICATIONS_SITE_ROUTE} component={SiteNotificationSettings} />
          <PrivateRoute exact path={SETTINGS_NOTIFICATIONS_TOAST_ROUTE} component={ToastNotificationSettings} />

          <PrivateRoute exact path={SETTINGS_PRIVACY_SECURITY_ROUTE} component={PrivacySecuritySettings} />
          <PrivateRoute exact path={SETTINGS_BLACK_LIST_ROUTE} component={BlackList} />
        </Switch>
      </Box>
    </SlidingViews>
  );
}

export default Settings;
