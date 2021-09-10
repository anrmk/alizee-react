import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Box, Card, CardContent } from "@material-ui/core";

import Benefits from "./Benefits";

import Cover from "../../components/Cover";
import Avatar from "../../components/Avatar";
import DisplayName from "../../components/DisplayName";

import SubscriptionForm from "./SubscriptionForm";

function SubscriptionDialog({ user, onSubmit, formId, onGetSubscription }) {
  const { userName } = user;
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    onGetSubscription(userName);
  }, []);

  return (
    <Card>
      {user && data && (
        <>
          <CardContent>
            <Cover src={data.coverUrl} height={100}>
              <Box
                display="flex"
                width="100%"
                alignItems="flex-end"
                position="relative"
                top="24px"
                paddingLeft={1}>
                <Avatar
                  src={data.avatarUrl}
                  size="big"
                  borderColor="silver"
                  borderWidth="4px"
                />
                <Box marginLeft={1} width="calc(100% - 124px)">
                  <DisplayName
                    name={data.name}
                    userName={data.userName}
                    identityVerified={data.identityVerified}
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
            campaigns={data.campaigns}
            bundles={data.bundles}
            subscriptionPrice={data.price}
          />
        </>
      )}
    </Card>
  );
}

export default SubscriptionDialog;
