import React from "react";
import { Box, IconButton, ListItem, Typography } from "@material-ui/core";

import AddIcon from "@material-ui/icons/AddRounded";

import useStyles from "./styles";

function CreateStoryItem({ previewUrl, onClick }) {
  const classes = useStyles({
    previewUrl,
  });

  const renderContent = () => (
    <Box className={classes.previewStoryItemUserInfo}>
      <Box borderColor="grey.500" className={classes.bottomContainer}>
        <Box className={classes.createButton}>
          <IconButton>
            <AddIcon htmlColor="white" />
          </IconButton>
        </Box>
        <Typography className={classes.createButtonText}>
          Create Story
        </Typography>
      </Box>
    </Box>
  );

  return (
    <ListItem button className={classes.previewStoryListItem} onClick={onClick}>
      {renderContent()}
    </ListItem>
  );
}

export default CreateStoryItem;
