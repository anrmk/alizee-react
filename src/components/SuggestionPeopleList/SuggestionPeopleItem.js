import React, { memo } from "react";
import isEqual from "react-fast-compare";

import ProfileCard from "../ProfileCard/ProfileCard";

function SuggestionPeopleItem(props) {
  return <ProfileCard {...props} />;
}

export default memo(SuggestionPeopleItem, isEqual);
