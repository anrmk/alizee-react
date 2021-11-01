import React from "react";

import { List, ListSubheader } from "@material-ui/core/";

import CampaignItem from "./CampaignItem";

function CampaignList({ data, disabled, onDelete, isProfile, isOwner }) {
  return (
    <List dense>
      {isProfile && <ListSubheader>Subscription Campaign</ListSubheader>}

      {data.map((item) => (
        <CampaignItem
          {...item}
          disabled={disabled}
          key={item.id}
          isProfile={isProfile}
          onDelete={onDelete}
          isOwner={isOwner}
        />
      ))}
    </List>
  );
}

export default CampaignList;
