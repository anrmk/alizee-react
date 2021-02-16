import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import Avatar from "../Avatar";

function Payment({ user, amount }) {
  return (
    <Card variant="outlined">
      <CardHeader avatar={<Avatar src={user.avatarUrl} />} title={user.name} subheader={user.userName} />

      <CardContent>Please confirm you want to purchase for ${amount}</CardContent>
    </Card>
  );
}

export default Payment;
