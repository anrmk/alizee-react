import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Tabs, Tab, Hidden } from "@material-ui/core";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import PagesIcon from "@material-ui/icons/PagesOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";

import useStyles from "./styles";

function PostTabs({
  isOwner,
  index,
  disabled,

  onTabChange,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChange = (_, newValue) => {
    onTabChange && onTabChange(newValue);
  };

  return (
    <Box marginBottom={1} className={classes.tabsWrapper}>
      <Hidden smDown>
        <Tabs
          value={index}
          onChange={handleChange}
          variant="fullWidth"
          centered>
          <Tab
            label={
              <Box display="flex" flexDirection="row">
                <Box marginRight={1}>
                  <AppsOutlinedIcon />
                </Box>
                {t("ProfileProfileContentPostsTabLabel")}
              </Box>
            }
            disabled={disabled}
          />
          <Tab
            label={
              <Box display="flex" flexDirection="row">
                <Box marginRight={1}>
                  <PagesIcon />
                </Box>
                {t("ProfileProfileContentTaggedTabLabel")}
              </Box>
            }
            disabled={disabled}
          />
          {isOwner && (
            <Tab
              label={
                <Box display="flex" flexDirection="row">
                  <Box marginRight={1}>
                    <PhotoOutlinedIcon />
                  </Box>
                  {t("ProfileProfileContentSavedTabLabel")}
                </Box>
              }
              disabled={disabled}
            />
          )}
        </Tabs>
      </Hidden>
      <Hidden mdUp>
        <Box paddingTop={2}>
          <Tabs
            value={index}
            onChange={handleChange}
            variant="fullWidth"
            centered>
            <Tab
              icon={<AppsOutlinedIcon fontSize="large" />}
              disabled={disabled}
              className={classes.tab}
            />
            <Tab
              icon={<PagesIcon fontSize="large" />}
              disabled={disabled}
              className={classes.tab}
            />
            {isOwner && (
              <Tab
                icon={<PhotoOutlinedIcon fontSize="large" />}
                disabled={disabled}
                className={classes.tab}
              />
            )}
          </Tabs>
        </Box>
      </Hidden>
    </Box>
  );
}

export default PostTabs;
