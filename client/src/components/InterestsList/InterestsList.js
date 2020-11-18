import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Box, Chip } from "@material-ui/core";

import useStyles from "./styles";

const InterestsList = forwardRef(({
  items,
  className,

  onSelected
}, ref) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(items);

  useEffect(() => {
    setSelected(items);
  }, [items])

  const handleChipClick = (chip) => {
    const updatedSelected = { ...selected };
    updatedSelected[chip.id].isSelected = !chip.isSelected;

    setSelected(updatedSelected);
    onSelected && onSelected(chip);
  }

  useImperativeHandle(ref, () => ({
    getSelected() {
      return selected;
    },
    getSelectedIds() {
      return Object.values(selected)
        .filter(item => item.isSelected)
        .map(item => item.id);
    }
  }))

  return (
    <Box className={[classes.chipList, className]}>
      {selected && Object.values(selected).map(item => (
        <Chip 
          key={item.id}
          className={classes.chip}
          color={item.isSelected ? "secondary" : "default"}
          label={item.name}
          onClick={() => handleChipClick(item)} />
      ))}
    </Box>
  );
})

export default InterestsList;
