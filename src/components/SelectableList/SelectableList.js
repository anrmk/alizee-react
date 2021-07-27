import React, { useState, useEffect } from "react";
import { List, Typography } from "@material-ui/core/";

import { arrayToObject, copyFlatObjectWithIgnore } from "../../helpers/functions";
import SelectableListItem from "./SelectableListItem";

const ITEM_NAME = "list-item-";

export default function SelectableList({
  items,
  preSelected = [],
  multiple = false,
  maxSelections = 0,

  onItemSelect
}) {
  const [selected, setSelected] = useState({});
  const [transformedItems, setTransformedItems] = useState({});

  useEffect(() => {
    if (items && 
        items.length) {
      setSelected(fillPreSelected(items, preSelected, multiple));
    }
  }, []);

  const fillPreSelected = (pItems, pPreSelected, pMultiple) => {
    const newSelected = {};
    const mapWithNamesToIndex = arrayToObject(pItems, "userName");
    setTransformedItems(mapWithNamesToIndex);

    if (pMultiple) {
      pPreSelected.forEach(key => {
        if (typeof key !== "string" || mapWithNamesToIndex[key] === undefined) return;

        newSelected[key] = mapWithNamesToIndex[key];
      });
    } else {
      const key = pPreSelected[0].userName;
      newSelected[key] = mapWithNamesToIndex[key];
    }

    return newSelected;
  }

  const isSelectedItem = (key) => {
    return !!selected[key];
  }

  const handleItemClick = (e) => {
    const currentKey = e.currentTarget.getAttribute("data-key");
    let newSelected = {};

    if (currentKey in selected) {
      const filteredSelected = copyFlatObjectWithIgnore(selected, [currentKey]);

      multiple ?
        newSelected = filteredSelected :
        newSelected = {};
    } else {
      if (maxSelections > 0 && Object.values(selected).length >= maxSelections) return;

      multiple ?
        newSelected = { ...selected, [currentKey]: transformedItems[currentKey] } :
        newSelected = { [currentKey]: transformedItems[currentKey] };
    }

    setSelected(newSelected);

    onItemSelect && onItemSelect(Object.values(newSelected));
  }

  return (
    <List>
      {items && items.length ? items.map((item) => (
        <SelectableListItem 
          key={ITEM_NAME + item.userName} 
          name={item.name}
		  userName={item.userName}
          avatarUrl={item.avatarUrl}
          userName={item.userName}
          active={isSelectedItem(item.userName)}
          onClick={handleItemClick} />
      )) : (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center">
            Nobody found
          </Typography>
        )}
    </List>
  );
}
