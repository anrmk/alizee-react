import React from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@material-ui/core";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { customFormatDate } from "../../helpers/functions";

import { DISCOUNT_MONTH_TYPE_RADIO_ID } from "../../constants/campaign";

import useStyles from "./styles";

function CampaignItem({ isProfile = false, ...rest }) {
  const classes = useStyles();

  const data = {
    ...rest,
  };

  const { onDelete } = rest;

  const generateText = () => {
    switch (data.subscribersType) {
      case 2:
        return "For expired and new subscribers";

      case 1:
        return "For expired subscribers";

      default:
        return "For new subscribers";
    }
  };
  return (
    <ListItem className={classes.item}>
      <ListItemText
        primary={
          <Typography variant="body1">
            {`${data.limit > 0 ? "Limited" : "No limited"} offer - ${
              data.type === DISCOUNT_MONTH_TYPE_RADIO_ID
                ? `${data.discount}% off`
                : "Free trial"
            } for ${data.duration} days `}
            {!isProfile && `- Claims ${data.claimsCount}`}
          </Typography>
        }
        secondary={
          <>
            {data?.message && <Typography>{data.message}</Typography>}
            <Typography variant="caption" color="textSecondary">
              {generateText()} -
              {!isProfile &&
                `${` started ${customFormatDate(data.createdDate)} `}-`}
              {data.endDate
                ? ` ends ${customFormatDate(data.endDate)} `
                : "Not expiration days"}
              - Left {data.limit - data.claimsCount}
            </Typography>
          </>
        }
      />

      {isProfile ? (
        <IconButton onClick={() => onDelete(data.id)}>
          <HighlightOffIcon />
        </IconButton>
      ) : (
        <Button
          onClick={() => onDelete(data.id)}
          variant="contained"
          color="primary">
          Delete
        </Button>
      )}
    </ListItem>
  );
}

export default CampaignItem;
