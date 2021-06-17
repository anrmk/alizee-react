import React from "react";
import { useHistory } from "react-router-dom";
import {
  ABOUT_ROUTE,
  HELP_ROUTE,
  PRIVACY_ROUTE,
  CONTACT_ROUTE,
  CONTRACT_ROUTE,
  PRIVACY_POLICY_ROUTE,
  HOW_IT_WORKS_ROUTE,
} from "../../constants/routes";

import { Grid, Link } from "@material-ui/core";
import useStyles from "./styles";

function Footer({ open }) {
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
        <Link href="#" onClick={() => history.push(CONTACT_ROUTE)}>
          Contact
        </Link>
      </Grid>
      <Grid item md={6}>
        {/* <Link href="#" className={classes.link}>Blog</Link> */}
        {/* <Link href="#">Branding</Link> */}
        {/* <Link href="#">Store</Link> */}
        <Link href="#" onClick={() => history.push(PRIVACY_POLICY_ROUTE)}>
          Terms of Service
        </Link>
        <Link href="#" onClick={() => history.push(PRIVACY_ROUTE)}>
          Privacy
        </Link>
        <Link href="#" onClick={() => history.push(HOW_IT_WORKS_ROUTE)}>
          How it works
        </Link>
        <Link href="#" onClick={() => history.push(`${HELP_ROUTE}/referral-program`)}>
          Referrals
        </Link>
        <Link href="#" onClick={() => history.push(PRIVACY_POLICY_ROUTE)}>
          Acceptable Use Policy
        </Link>
        <Link href="#" onClick={() => history.push(PRIVACY_POLICY_ROUTE)}>
          Complaints Policy
        </Link>
        <Link href="#" onClick={() => history.push(CONTRACT_ROUTE)}>
          Standard Contract between Fan and Creator
        </Link>
      </Grid>
    </Grid>
  );
}

export default Footer;
