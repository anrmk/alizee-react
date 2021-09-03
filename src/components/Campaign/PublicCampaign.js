import React from "react";
import { Typography, Box } from "@material-ui/core";

import { customFormatDate, addDays } from "../../helpers/functions";

import { DISCOUNT_MONTH_TYPE_RADIO_ID } from "../../constants/campaign";

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
          ` - ${campaign.limit - campaign.claimsCount} offers left `}
      </Typography>

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
