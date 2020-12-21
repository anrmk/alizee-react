import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@material-ui/core";

import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import RedeemIcon from '@material-ui/icons/Redeem';

import {formatDate} from "../../helpers/functions";

import useStyles from "./styles";

function Details({
  location,
  offlineDate,
  hourlyRate,

  onSendGiftClick
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.detailsBox}>
      <Box className={classes.detailsBoxItems}>
        <Box className={classes.detailsBoxItem}>
          <LocationOnOutlinedIcon />
          <Typography className={classes.detailsBoxItemLabel} variant="subtitle2">{location}</Typography>
        </Box>
        <Box className={classes.detailsBoxItem}>
          <AttachMoneyOutlinedIcon />
          <Typography className={classes.detailsBoxItemLabel} variant="subtitle2">{t("ProfileProfileDetailsHourlyRateLabel")}</Typography>
          <Typography noWrap className={classes.detailsBoxHourlyRate} variant="subtitle1">${hourlyRate}</Typography>
        </Box>
        <Box className={classes.detailsBoxItem}>
          <FiberManualRecordIcon color="secondary" />
          <Typography className={classes.detailsBoxItemLabel} variant="subtitle2">{offlineDate && formatDate(offlineDate)}</Typography>
        </Box>
      </Box>
      <IconButton onClick={() => onSendGiftClick()}>
        <RedeemIcon className={classes.detailsBoxIconButton} />
      </IconButton>
    </Box>
  );
}

Details.propTypes = {
  location: PropTypes.string,
  offlineDate: PropTypes.string,
  hourlyRate: PropTypes.number,

  onSendGiftClick: PropTypes.func
};

Details.defaultProps = {
  location: "",
  offlineDate: null,
  hourlyRate: 0,

  onSendGiftClick: undefined
};

export default Details;