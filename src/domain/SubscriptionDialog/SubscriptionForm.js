import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import {
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Checkbox,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";

import { calcDiscount } from "../../helpers/functions";
import { getSubscriptionBtnText } from "../ProfileUserInfo";
import { FOLLOW_NONE } from "../../constants/follow_types";

function SubscriptionForm({
  formId,
  user,
  campaigns,
  bundles,
  subscriptionPrice,
  price,

  onSubmit,
}) {
  const [discount, setDiscount] = useState({
    bundleId: "",
    campaignId: "",
    general: true,
  });

  const { t } = useTranslation();

  const handleItemClick = (data) => {
    setDiscount(data);
  };

  const handleFormSubmit = () => {
    onSubmit &&
      onSubmit({
        userName: user.userName,
        isFollow: user.isFollow,
        followStatus: user.followStatus,
        isPrivate: user.isPrivate,
        subscriptionPrice: user.subscriptionPrice || price,
        bundleId: discount.bundleId,
        campaignId: discount.campaignId,
      });
  };

  const generateTerm = (duration) => {
    switch (duration) {
      case 3:
        return "Quarterly";

      case 6:
        return "Half-year";

      default:
        return "Yearly";
    }
  };

  return (
    <CardContent id={formId} component="form" onSubmit={handleFormSubmit}>
      <List disablePadding dense>
        <ListSubheader>General</ListSubheader>
        <ListItem
          selected={discount.general}
          button
          onClick={() =>
            handleItemClick({
              campaignId: "",
              bundleId: "",
              general: true,
            })
          }>
          <ListItemIcon>
            <Checkbox edge="start" checked={discount.general} disableRipple />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1">
                {getSubscriptionBtnText(
                  FOLLOW_NONE,
                  subscriptionPrice || price,
                  t,
                  user?.subscriptionStatus
                )}
                {subscriptionPrice > 0 && " per month"}
              </Typography>
            }
          />
        </ListItem>

        {subscriptionPrice > 0 && (
          <>
            {campaigns.length > 0 && (
              <>
                <ListSubheader>Campaign</ListSubheader>
                {campaigns.map((campaign) => (
                  <ListItem
                    key={campaign.id}
                    button
                    selected={discount.campaignId === campaign.id}
                    onClick={() =>
                      handleItemClick({
                        bundleId: "",
                        campaignId: campaign.id,
                        general: false,
                      })
                    }>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={discount.campaignId === campaign.id}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Typography variant="body1">
                          {campaign.type === 0
                            ? "First month discount -"
                            : "Free Trial -"}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          component="p"
                          color="textSecondary">
                          {campaign.type === 0
                            ? `Promotional subscription $${calcDiscount(
                                subscriptionPrice,
                                campaign.discount,
                                1
                              )} USD per month.`
                            : `Promotional subscription $0.00 USD for ${campaign.duration} days.
						  User will not be subscribed for $${subscriptionPrice} automatically, only by choice`}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Typography>
                        {campaign.type === 0
                          ? `$${calcDiscount(
                              subscriptionPrice,
                              campaign.discount,
                              1
                            )}/mo`
                          : "Free"}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </>
            )}

            {bundles.length > 0 && (
              <>
                <ListSubheader>Bundles</ListSubheader>
                {bundles.map((item) => (
                  <ListItem
                    key={item.id}
                    button
                    selected={discount.bundleId === item.id}
                    onClick={() =>
                      handleItemClick({
                        bundleId: item.id,
                        campaignId: "",
                        general: false,
                      })
                    }>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={discount.bundleId === item.id}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1">
                          {generateTerm(item.duration)} -
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          component="p"
                          color="textSecondary">
                          Billed for $
                          {calcDiscount(
                            subscriptionPrice,
                            item.discount,
                            item.duration
                          )}{" "}
                          every {item.duration} months - save {item.discount}%
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Typography>
                        {`$${calcDiscount(
                          subscriptionPrice,
                          item.discount,
                          item.duration
                        )}/mo`}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </>
            )}
          </>
        )}
      </List>
    </CardContent>
  );
}

export default SubscriptionForm;
