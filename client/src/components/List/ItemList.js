import React from "react";
import PropTypes from 'prop-types';

export default function ItemList({ as, className, children, onClick }) {
  return React.createElement(as, { className: "list-group-item " + className, onClick}, children)
}

ItemList.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func
}

ItemList.defaultProps = {
  as: "li",
  className: "",
  children: null,
  onClick: (e) => {}
}
