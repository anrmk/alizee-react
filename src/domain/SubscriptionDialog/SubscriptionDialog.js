import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Card, CardContent } from "@material-ui/core";

import Benefits from "./Benefits";

import Cover from "../../components/Cover";
import Avatar from "../../components/Avatar";
import DisplayName from "../../components/DisplayName";
import { getSubscribe } from "../../store/actions/relationship";

import SubscriptionForm from "./SubscriptionForm";

function SubscriptionDialog({ user, onSubmit, formId }) {
  const dispatch = useDispatch();
  const { campaign, bundles, subscriptionPrice } = useSelector(
    (state) => state.user.data
  );

  useEffect(() => {
    dispatch(getSubscribe());
  }, []);

  return (
    <Card>
      <CardContent>
        <Cover src={user.coverUrl} height={100}>
          <Box
            display="flex"
            width="100%"
            alignItems="flex-end"
            position="relative"
            top="24px"
            paddingLeft={1}>
            <Avatar
              src={user.avatarUrl}
              live={user.live}
              size="big"
              borderColor="silver"
              borderWidth="4px"
            />
            <Box marginLeft={1} width="calc(100% - 124px)">
              <DisplayName
                name={user.name}
                userName={user.userName}
                identityVerified={user.identityVerified}
                noWrap={false}
                alignItems="flex-start"
              />
            </Box>
          </Box>
        </Cover>
      </CardContent>
      <CardContent>
        <Benefits />
      </CardContent>
      <SubscriptionForm
        onSubmit={onSubmit}
        formId={formId}
        user={user}
        campaign={campaign}
        bundles={bundles}
        subscriptionPrice={subscriptionPrice}
      />
    </Card>
  );
}

export default SubscriptionDialog;
