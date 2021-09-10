import React from "react";

import { List, ListSubheader } from "@material-ui/core/";

import BundleItem from "./BundleItem";

function BundleList({
  data,
  isProfile = false,
  price,
  disabled,

  onDelete,
}) {
  return (
    <List dense>
      {isProfile && <ListSubheader>Subscription Bundle</ListSubheader>}
      {data.map((item) => (
        <BundleItem
          isProfile={isProfile}
          key={item.duration}
          id={item.id}
          onDelete={onDelete}
          duration={item.duration}
          discount={item.discount}
          price={price}
          disabled={disabled}
        />
      ))}
    </List>
  );
}

export default BundleList;
