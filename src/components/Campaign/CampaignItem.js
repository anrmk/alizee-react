import React from "react";
import { Typography, ListItem, ListItemText, Button } from "@material-ui/core";

import { customFormatDate, addDays } from "../../helpers/functions";

import { DISCOUNT_MONTH_TYPE_RADIO_ID } from "../../constants/campaign";

import useStyles from "./styles";

function CampaignItem({ isProfile = false, isOwner = true, ...rest }) {
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
    <>
      {isOwner ? (
        <ListItem className={classes.item} disabled={data.disabled}>
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

          {!isProfile && (
            <Button
              onClick={() => onDelete(data.id)}
              variant="contained"
              color="primary"
              disabled={data.disabled}>
              Delete
            </Button>
          )}
        </ListItem>
      ) : (
        <ListItem className={classes.item} disabled={data.disabled}>
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
                  Your offer ends{" "}
                  {customFormatDate(addDays(data.createdDate, 30))}{" "}
                  {data.limit > 0 &&
                    ` - ${data.limit - data.claimsCount} offers left `}
                  {`${
                    data?.endDate
                      ? `Offer expired ${customFormatDate(data.endDate)}`
                      : "Offer not expired"
                  }`}
                </Typography>
              </>
            }
          />
        </ListItem>
      )}
    </>
  );
}

export default CampaignItem;
