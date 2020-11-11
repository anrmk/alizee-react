import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Box, Card, Tabs, Tab } from "@material-ui/core";

import { 
  SETTINGS_EDIT_PROFILE_ROUTE,
  SETTINGS_INTERESTS_ROUTE,
  SETTINGS_NOTIFICATION_ROUTE,
  SETTINGS_PRIVACY_SECURITY_ROUTE
} from "../../constants/routes";
import PrivateRoute from "../PrivateRoute";

import EditProfileSettings from "./EditProfileSettings";
import PrivacySecuritySettings from "./PrivacySecuritySettings";
import useStyles from "./styles";

function a11yProps(key) {
  return {
    id: `vertical-tab-${key}`,
    'aria-controls': `vertical-tabpanel-${key}`,
  };
}

const TABS = {
  "edit-profile": 0,
  "interests": 1,
  "notification": 2,
  "privacy-security": 3
}

function Settings() {
  const { type } = useParams();
  const [currentTab, setCurrentTab] = useState(TABS[type]);
  const classes = useStyles();

  useEffect(() => {
    if (type) {
      setCurrentTab(TABS[type]);
    }
  }, [type])

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={currentTab}
          onChange={(_, value) => setCurrentTab(value)}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab 
            to={SETTINGS_EDIT_PROFILE_ROUTE} 
            className={classes.tab}
            component={Link} 
            label="Edit Profile"
            {...a11yProps(TABS["edit-profile"])} />
          <Tab 
            to={SETTINGS_INTERESTS_ROUTE} 
            className={classes.tab}
            component={Link} 
            label="Interests" 
            {...a11yProps(TABS["interests"])} />
          <Tab 
            to={SETTINGS_NOTIFICATION_ROUTE} 
            className={classes.tab}
            component={Link} 
            label="Notification" 
            {...a11yProps(TABS["notification"])} />
          <Tab 
            to={SETTINGS_PRIVACY_SECURITY_ROUTE} 
            className={classes.tab}
            component={Link} 
            label="Privacy and Security" 
            {...a11yProps(TABS["privacy-security"])} />
        </Tabs>
        <Box className={classes.content}>
          <PrivateRoute exact path={SETTINGS_EDIT_PROFILE_ROUTE} component={EditProfileSettings} />
          <PrivateRoute exact path={SETTINGS_PRIVACY_SECURITY_ROUTE} component={PrivacySecuritySettings} />
        </Box>
      </Card>
    </Container>
  )
}

export default Settings;
