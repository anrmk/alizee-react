import React, { useState } from "react";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";

import PhotoLibraryIcon from "@material-ui/icons/PhotoLibraryOutlined";
import FeelingIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooksOutlined";

import useStyles from "./styles";

function CreateForm({ formOnClick }) {
  const classes = useStyles();
  const [value, setValue] = useState("POST");

  const handleBottomNavigationChange = (e, newValue) => {
    setValue(newValue);
    formOnClick && formOnClick(e, newValue);
  };

  return (
    <BottomNavigation showLabels className={classes.navigation} value={value} onChange={handleBottomNavigationChange}>
      <BottomNavigationAction label="Photo/Video" value="POST" icon={<PhotoLibraryIcon />} />
      <BottomNavigationAction label="Feeling" value="FEELING" icon={<FeelingIcon />} />
      <BottomNavigationAction label="Story" value="STORY" icon={<LibraryBooksIcon />} />
    </BottomNavigation>
  );
}

export default CreateForm;
