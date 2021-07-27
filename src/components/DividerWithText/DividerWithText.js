import React from "react";
import useStyles from "./styles";

function DividerWithText({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <span className={classes.content}>{children}</span>
      <div className={classes.border} />
    </div>
  );
}

export default DividerWithText;
