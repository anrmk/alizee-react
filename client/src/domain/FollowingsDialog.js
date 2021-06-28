import React, { useEffect } from "react";

import SelectableList from "../components/SelectableList/SelectableList";
import SearchInput from "./Search";

function FollowingsDialog({
  items,
  preSelected = [],
  multiple = false,

  onItemSelect,
  onSendQuery,
  resetQuery,
}) {
  useEffect(() => {
    return () => {
      resetQuery();
    };
  }, []);

  return (
    <>
      <SearchInput onSendQuery={onSendQuery} />
      <SelectableList items={items} preSelected={preSelected} multiple={multiple} onItemSelect={onItemSelect} />
    </>
  );
}

export default FollowingsDialog;
