import React from "react";

import { List, ListSubheader } from "@material-ui/core/";

import CampaignItem from "./CampaignItem";

function CampaignList({ data, onDelete, isProfile }) {
  return (
    <List dense>
      {isProfile && <ListSubheader>Subscription Campaign</ListSubheader>}

      {data.map((item) => (
        <CampaignItem
          {...item}
          key={item.id}
          isProfile={isProfile}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}

export default CampaignList;
