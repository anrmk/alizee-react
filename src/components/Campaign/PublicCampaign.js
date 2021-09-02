import React from "react";
import { Typography, Button, Box } from "@material-ui/core";

import {
  customFormatDate,
  addDays,
  calcDiscount,
} from "../../helpers/functions";

import {
  DISCOUNT_MONTH_TYPE_RADIO_ID,
  FREE_TYPE_RADIO_ID,
} from "../../constants/campaign";

import useStyles from "./styles";

function PublicCampaign({
  price,
  children,
  user,

  getSubscriptionBtnText,
  t,
  onClick,
  campaign,
}) {
  const classes = useStyles();

  const subscriptionPrice =
    FREE_TYPE_RADIO_ID === campaign.type
      ? 0
      : calcDiscount(price, campaign.discount, campaign.duration, true);
  return (
    <Box width="100%">
      <Typography variant="body1">
        {`${campaign.limit > 0 ? "Limited" : "No limited"} offer - ${
          campaign.type === DISCOUNT_MONTH_TYPE_RADIO_ID
            ? `${campaign.discount}% off`
            : "Free trial"
        } for ${campaign.duration} days `}
      </Typography>
      {campaign?.message && (
        <Typography variant="body2">{campaign.message}</Typography>
      )}
      <Typography variant="caption" color="textSecondary">
        Your offer ends {customFormatDate(addDays(campaign.createdDate, 30))}{" "}
        {campaign.limit > 0 &&
          ` - ${campaign.limit - campaign.claimsCount} offers left`}
      </Typography>
      <Box mt={2} display="flex" alignItems="center">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => {
            onClick(e, {
              ...user,
              campaignId: campaign.id,
              subscriptionPrice,
            });
          }}>
          {`
		  		${
            campaign.type === DISCOUNT_MONTH_TYPE_RADIO_ID && price > 0
              ? getSubscriptionBtnText(false, subscriptionPrice, t)
              : "Subscribe Free"
          }
		 
		 `}
        </Button>
        {children}
      </Box>
      <Typography variant="caption" color="textSecondary">
        {`${
          campaign?.endDate
            ? `Offer expired ${customFormatDate(campaign.endDate)}`
            : "Offer not expired"
        }`}
      </Typography>
    </Box>
  );
}

export default PublicCampaign;
