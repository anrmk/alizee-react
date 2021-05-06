import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";

import Avatar from "../Avatar";
import { TAX_PERCENTAGE } from "../../constants/payment";

function Payment({ user, amount }) {
  return (
    <Card variant="outlined">
      <CardHeader avatar={<Avatar src={user.avatarUrl} />} title={user.name} subheader={user.userName} />

      <CardContent>Please confirm you want to purchase {amount > 0 ? `for $${amount} + $${Math.round(amount * TAX_PERCENTAGE)}(tax)` : "for Free"}</CardContent>
    </Card>
  );
}

export default Payment;
