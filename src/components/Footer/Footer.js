/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Link, Box } from "@material-ui/core";
import {
  ABOUT_ROUTE,
  HELP_ROUTE,
  PRIVACY_ROUTE,
  CONTACT_ROUTE,
  CONTRACT_ROUTE,
  PRIVACY_POLICY_ROUTE,
  HOW_IT_WORKS_ROUTE,
  COOKIE_POLICY_ROUTE,
  ACCEPTABLE_USE_POLICY_HASH,
  COMPLAINTS_POLICY_HASH,
  REFERRAL_PROGRAM_ROUTE,
  HOME_ROUTE,
} from "../../constants/routes";

import useStyles from "./styles";

function Footer({ open, sidebarFooter = false }) {
  const classes = useStyles({ open, sidebarFooter });
  const history = useHistory();

  return (
    <>
      {sidebarFooter ? (
        <Box className={classes.root}>
          <Link
            href="#"
            onClick={() => history.push(`${HELP_ROUTE}${PRIVACY_POLICY_ROUTE}`)}
            color="textSecondary">
            Terms of Service
          </Link>
          <Link
            href="#"
            onClick={() => history.push(`${HELP_ROUTE}${PRIVACY_ROUTE}`)}
            color="textSecondary">
            Privacy
          </Link>
          <Link
            href="#"
            onClick={() => history.push(CONTACT_ROUTE)}
            color="textSecondary">
            Contact
          </Link>
          <Link
            href="#"
            onClick={() => history.push(`${HELP_ROUTE}${COOKIE_POLICY_ROUTE}`)}
            color="textSecondary">
            Cookie Policy
          </Link>
          <Link
            href="#"
            onClick={() => history.push(HELP_ROUTE)}
            color="textSecondary">
            More...
          </Link>
          <Link
            href="#"
            onClick={() => history.push(`${HOME_ROUTE}`)}
            color="textSecondary">
            © 2021 The Members
          </Link>
        </Box>
      ) : (
        <Grid container className={classes.root}>
          <Grid item md={6}>
            <Link href="#" onClick={() => history.push(`${HOME_ROUTE}`)}>
              © 2021 The Members{" "}
            </Link>
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
            <Link
              href="#"
              onClick={() =>
                history.push(`${HELP_ROUTE}${PRIVACY_POLICY_ROUTE}`)
              }>
              Terms of Service
            </Link>
            <Link
              href="#"
              onClick={() => history.push(`${HELP_ROUTE}${PRIVACY_ROUTE}`)}>
              Privacy
            </Link>
            <Link
              href="#"
              onClick={() =>
                history.push(`${HELP_ROUTE}${HOW_IT_WORKS_ROUTE}`)
              }>
              How it works
            </Link>
            <Link
              href="#"
              onClick={() =>
                history.push(`${HELP_ROUTE}${REFERRAL_PROGRAM_ROUTE}`)
              }>
              Referrals
            </Link>
            <Link
              href={ACCEPTABLE_USE_POLICY_HASH}
              onClick={() =>
                history.push(`${HELP_ROUTE}${PRIVACY_POLICY_ROUTE}`)
              }>
              Acceptable Use Policy
            </Link>
            <Link
              href={COMPLAINTS_POLICY_HASH}
              onClick={() =>
                history.push(`${HELP_ROUTE}${PRIVACY_POLICY_ROUTE}`)
              }>
              Complaints Policy
            </Link>
            <Link
              href="#"
              onClick={() => history.push(`${HELP_ROUTE}${CONTRACT_ROUTE}`)}>
              Standard Contract between Fan and Creator
            </Link>
            <Link
              href="#"
              onClick={() =>
                history.push(`${HELP_ROUTE}${COOKIE_POLICY_ROUTE}`)
              }>
              Cookie Policy
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Footer;
