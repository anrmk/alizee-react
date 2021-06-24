import React from "react";
import useStyles from "./styles";

function Animate({ children, variant = "pulse" }) {
  const classes = useStyles();

  return React.cloneElement(children, { className: classes[variant] });
}

export default Animate;
