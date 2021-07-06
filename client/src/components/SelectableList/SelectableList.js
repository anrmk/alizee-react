import React, { useState, useEffect } from "react";
import { List, Typography } from "@material-ui/core/";

import { copyFlatObjectWithIgnore } from "../../helpers/functions";
import SelectableListItem from "./SelectableListItem";

const ITEM_NAME = "list-item-";

export default function SelectableList({
  items,
  preSelected = [],
  multiple = false,

  onItemSelect
}) {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (items && 
        items.length && 
        preSelected.length && 
        preSelected.length <= items.length) {
      setSelected(fillPreSelected(items, preSelected, multiple));
    }
  }, preSelected);

  const fillPreSelected = (pItems, pPreSelected, pMultiple) => {
    const tempSelected = {};
    const tempIndexSelected = [];
    const mapWithNamesToIndex = pItems.reduce((acc, curr, i) => ({ ...acc, [curr.name]: i }), {});

    if (pMultiple) {
      pPreSelected.forEach(value => {
        if (typeof value === "string") {
          value = mapWithNamesToIndex[value];
          if (value && value === -1) return;
        }

        if (value >= pItems.length) {
          console.warn(`The ${value} index out of range of items`);
        } else {
          tempSelected[value] = pItems[value];
          tempIndexSelected.push(value);
        }
      });
    } else {
      const firstIndex = pPreSelected[0];
      tempSelected[firstIndex] = pItems[firstIndex];
    }

    return tempSelected;
  }

  const isSelectedItem = (value) => {
    return !!selected[value];
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
      multiple ?
        newSelected = { ...selected, [currentKey]: items[currentKey] } :
        newSelected = { [currentKey]: items[currentKey] };
    }

    setSelected(newSelected);

    onItemSelect && onItemSelect(Object.values(newSelected));
  }

  return (
    <List>
      {items && items.length ? items.map((item, index) => (
        <SelectableListItem 
          key={ITEM_NAME + index} 
          name={item.name}
		  userName={item.userName}
          avatarUrl={item.avatarUrl}
          index={index}
          active={isSelectedItem(index)}
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
