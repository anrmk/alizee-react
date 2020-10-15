import React from "react";

import { ItemList } from '../../components/List';

import './SocialList.scss';

export default function SocialItemList({ renderIcon, text, renderButton }) {
  const renderContent = () => {
    return (
      <div className="d-flex align-items-center">
        <div className="">{renderIcon && renderIcon()}</div>
        <div className="ml-3">{text}</div>
      </div>
    )
  }

  return (
    <ItemList className="social-item">
      {renderButton && renderButton({ children: renderContent() })}
    </ItemList>
  );
}
