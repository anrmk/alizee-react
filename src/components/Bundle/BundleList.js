import React from "react";

import { List, ListSubheader } from "@material-ui/core/";

import BundleItem from "./BundleItem";

function BundleList({
  isOwner,
  data,
  user,
  isProfile = false,
  price,
  disabled,

  onDelete,
  onSubscribeClick,
}) {
  return (
    <List dense>
      {isProfile && <ListSubheader>Subscription Bundle</ListSubheader>}
      {data.map((item) => (
        <BundleItem
          isProfile={isProfile}
          isOwner
          key={item.duration}
          id={item.id}
          onDelete={onDelete}
          onSubscribeClick={onSubscribeClick}
          duration={item.duration}
          discount={item.discount}
          price={price}
          user={user}
          disabled={disabled}
        />
      ))}
    </List>
  );
}

export default BundleList;
