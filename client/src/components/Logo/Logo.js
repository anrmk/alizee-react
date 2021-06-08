import { Box } from "@material-ui/core";
import React from "react";

import { Link } from "react-router-dom";

import { HOME_ROUTE } from "../../constants/routes";

import useStyles from "./styles";

function Logo() {
  const classes = useStyles();

  return <Link to={HOME_ROUTE} className={classes.logo} />;
}

export default Logo;
