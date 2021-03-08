import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Tabs, Tab, IconButton, Card, CardContent, CardHeader } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBackRounded";

import {
  SETTINGS_BLACK_LIST_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
  SETTINGS_CARD_ROUTE,
  SETTINGS_BANK_ROUTE,
  SETTINGS_INTERESTS_ROUTE,
  SETTINGS_NOTIFICATION_ROUTE,
  SETTINGS_PRIVACY_SECURITY_ROUTE,
  SETTINGS_PERSONAL_ROUTE,
  SETTINGS_SUBSCRIPTION_ROUTE
} from "../../constants/routes";
import PrivateRoute from "../PrivateRoute";
import SlidingViews from "../../components/SlidingViews";

import BlackList from "./BlackList";
import EditProfileSettings from "./EditProfileSettings";
import EditPersonalSettings from "./EditPersonalSettings";
import EditCardSettings from "./EditCardSettings";
import EditSubscriptionSettings from "./EditSubscriptionSettings";
import EditBankSettings from "./EditBankSettings";
import InterestsSettings from "./InterestsSettings";
import PrivacySecuritySettings from "./PrivacySecuritySettings";
import NotificationSettings from "./NotificationSettings";

import useStyles from "./styles";
import useSlidingViews, { RIGHT_OPEN_TYPE } from "../../hooks/useSlidingViews";
import useViewport from "../../hooks/useViewport";

const TABS = [
  {
    index: 0,
    name: "edit-profile",
    title: "Profile",
    route: SETTINGS_EDIT_PROFILE_ROUTE,
  },
  {
    index: 1,
    name: "personal-info",
    title: "Personal Info",
    route: SETTINGS_PERSONAL_ROUTE,
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
    name: "interests",
    title: "Interests",
    route: SETTINGS_INTERESTS_ROUTE,
  },
  {
    index: 5,
    name: "subscription",
    title: "Subscription",
    route: SETTINGS_SUBSCRIPTION_ROUTE
  },
  {
    index: 6,
    name: "notification",
    title: "Notification",
    route: SETTINGS_NOTIFICATION_ROUTE,
  },
  {
    index: 7,
    name: "privacy-security",
    title: "Privacy and Security",
    route: SETTINGS_PRIVACY_SECURITY_ROUTE,
  }
];

const findTab = (value) => {
  return TABS.find((x) => x.name === value || x.index === value);
};

const a11yProps = (key) => {
  return {
    id: `vertical-tab-${key}`,
    "aria-controls": `vertical-tabpanel-${key}`,
  };
};

function Settings() {
  const { type } = useParams();
  const { up } = useViewport();
  const [currentTab, setCurrentTab] = useState(findTab(type));
  const { currentSlidingViewsState, toggleSlidingViewsState } = useSlidingViews(RIGHT_OPEN_TYPE);
  const classes = useStyles();

  useEffect(() => {
    if (type) {
      setCurrentTab(findTab(type));
      toggleSlidingViewsState();
    }
  }, [type]);

  return (
    <Container>
      <SlidingViews mobileOnly currentState={currentSlidingViewsState} firstSize={4} secondSize={8}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={currentTab.index}
          className={classes.tabs}
          onChange={(_, value) => setCurrentTab(findTab(value))}
        >
          {TABS &&
            TABS.map((tab) => (
              <Tab key={tab.index} to={tab.route} component={Link} label={tab.title} {...a11yProps(tab.index)} />
            ))}
        </Tabs>

        <Card>
          <CardHeader
            title={currentTab.title}
            action={
              !up("md") && (
                <IconButton onClick={() => toggleSlidingViewsState()}>
                  <BackIcon />
                </IconButton>
              )
            }
          />
          <CardContent>
            <PrivateRoute exact path={SETTINGS_EDIT_PROFILE_ROUTE} component={EditProfileSettings} />
            <PrivateRoute exact path={SETTINGS_PERSONAL_ROUTE} component={EditPersonalSettings} />
            <PrivateRoute exact path={SETTINGS_CARD_ROUTE} component={EditCardSettings} />
            <PrivateRoute exact path={SETTINGS_BANK_ROUTE} component={EditBankSettings} />
            <PrivateRoute exact path={SETTINGS_INTERESTS_ROUTE} component={InterestsSettings} />
            <PrivateRoute exact path={SETTINGS_SUBSCRIPTION_ROUTE} component={EditSubscriptionSettings} />
            <PrivateRoute exact path={SETTINGS_NOTIFICATION_ROUTE} component={NotificationSettings} />
            <PrivateRoute exact path={SETTINGS_PRIVACY_SECURITY_ROUTE} component={PrivacySecuritySettings} />
            <PrivateRoute exact path={SETTINGS_BLACK_LIST_ROUTE} component={BlackList} />
          </CardContent>
        </Card>
      </SlidingViews>
    </Container>
  );
}

export default Settings;
