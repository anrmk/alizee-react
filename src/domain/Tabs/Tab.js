import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./Tabs.scss";

function Tab({ 
  eventKey,
  route,
  title,
  active,
  className,

  onClick
}) {
  const activeClass = "c-tab--active active";

  return (
    <Link
      className={`c-tab not-link ${className} ${active ? activeClass : ''}`}
      to={route}
      onClick={() => onClick(eventKey)}>
      {title}
    </Link>
  )
}

Tab.propTypes = {
  eventKey: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
  
  onClick: PropTypes.func
}

Tab.defaultProps = {
  eventKey: "",
  route: "",
  title: "",
  active: false,
  className: "",

  onClick: eventKey => {}
};

export default Tab;
