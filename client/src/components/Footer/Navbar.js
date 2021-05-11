import React from "react";
import { useHistory } from "react-router-dom";
import { ABOUT_ROUTE, HELP_ROUTE, PRIVACY_ROUTE } from "../../constants/routes";

import { Box, Grid, Typography, ListItem, Link, List } from "@material-ui/core";
import useStyles from "./styles";

function Navbar({ open }) {
  const classes = useStyles({ open });
  const history = useHistory();

  return (
    <Grid container className={classes.root}>
      <Grid item md={6}>
        <Link href="#">© 2021 TheMembers </Link>
        <Link href="#" onClick={() => history.push(HELP_ROUTE)}>
          Help
        </Link>
        <Link href="#" onClick={() => history.push(ABOUT_ROUTE)}>
          About
        </Link>
        <Link href="#">Contact</Link>
      </Grid>
      <Grid item md={6}>
        <Link href="#" className={classes.link}>Blog</Link>
        <Link href="#">Branding</Link>
        <Link href="#">Store</Link>
        <Link href="#">Terms of Service</Link>
        <Link href="#" onClick={() => history.push(PRIVACY_ROUTE)}>
          Privacy
        </Link>
        <Link href="#">How it works</Link>
        <Link href="#">Referrals</Link>
        <Link href="#">Acceptable Use Policy</Link>
        <Link href="#">Complaints Policy</Link>
        <Link href="#">Standard Contract between Fan and Creator</Link>
      </Grid>
    </Grid>
  );
}

export default Navbar;
