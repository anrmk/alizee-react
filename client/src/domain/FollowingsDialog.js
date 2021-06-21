import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import * as actionRelationship from "../store/actions/relationship";

import SelectableList from "../components/SelectableList/SelectableList";
import SearchInput from "./Search";

function FollowingsDialog({
  items,
  preSelected = [],
  multiple = false,

  onItemSelect,
}) {
  const dispatch = useDispatch();

  const handleRoomsFilter = (query) => {
    dispatch(actionRelationship.filterFollowings(query));
  };

  useEffect(() => {
    return () => {
      dispatch(actionRelationship.resetFollowingsFilter());
    };
  }, []);

  return (
    <>
      <SearchInput onSendQuery={handleRoomsFilter} />
      <SelectableList items={items} preSelected={preSelected} multiple={multiple} onItemSelect={onItemSelect} />
    </>
  );
}

export default FollowingsDialog;
