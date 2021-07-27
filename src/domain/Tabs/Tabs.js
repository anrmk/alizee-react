import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { getFirstElement } from "../../helpers/functions";

import "./Tabs.scss";

function Tabs({ 
  activeKey,
  classNameContainer,
  classNameMenu,
  classNameContent,
  menuSize,
  contentSize,
  children,

  onSelect
}) {
  const activeContentItem = "show active";
  const [currentKey, setCurrentKey] = useState(
    activeKey || getFirstElement(children).props.eventKey
  );

  useEffect(() => {
    setCurrentKey(activeKey);
  }, [activeKey])

  const handleTabSelect = id => {
    setCurrentKey(id);
    onSelect && onSelect(id);
  }

  const renderTabs = element => {
    if (Array.isArray(element)) {
      const tabsExtended = React.Children.map(children, tabElement => {
        const newProps = {
          ...tabElement.props,
          active: currentKey === tabElement.props.eventKey,
          onClick: id => handleTabSelect(id)
        };  

        return React.cloneElement(tabElement, newProps);
      });

      return tabsExtended;
    }

    // If is not an array then just render a single tab
    return (
      element.props.children({ ...element.props, onClick: id => handleTabSelect(id) })
    );
  }

  const renderContent = element => {
    if (Array.isArray(element)) {
      const contentExtended = React.Children.map(element, ({ props }) => {
        const contentElements = props?.children;
        const newProps = {
          className: `tab-pane ${currentKey === props.eventKey ? activeContentItem : ''}`
        };

        return React.createElement("div", newProps, contentElements);
      });

      return contentExtended;
    }

    // If is not an array then just render a single content
    return (
      element.props.children({ ...element.props, onClick: id => handleTabSelect(id) })
    );
  }

  return (
    <div className={`row ${classNameContainer}`}>
      <div className={`c-tabs-menu col-${menuSize} ${classNameMenu}`}>
        <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
          {renderTabs(children)}
        </div>
      </div>
      <div className={`c-tabs-content col-${contentSize} p-0`}>
        <div className={`tab-content ${classNameContent}`}>
          {renderContent(children)}
        </div>
      </div>
    </div>
  )
}

Tabs.propTypes = {
  activeKey: PropTypes.string.isRequired,
  classNameContainer: PropTypes.string,
  classNameMenu: PropTypes.string,
  classNameContent: PropTypes.string,
  menuSize: PropTypes.number,
  contentSize: PropTypes.number,
  children: PropTypes.node.isRequired,
  
  onSelect: PropTypes.func
}

Tabs.defaultProps = {
  activeKey: "",
  classNameContainer: "",
  classNameMenu: "",
  classNameContent: "",
  menuSize: 3,
  contentSize: 9,
  children: null,

  onSelect: undefined
};

export default Tabs;
