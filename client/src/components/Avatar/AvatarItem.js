import React from "react";

import { Avatar } from "../Avatar";

function AvatarItem({url, title, subtitle, size}) {
  return (
    <div className="d-flex justify-content-start align-items-center text-truncate">
      <Avatar size={size} url={url} className="mr-3" />
      <div>
        <strong className="d-block">{title}</strong>
        <small className="text-muted">{subtitle}</small>
      </div>
    </div>
  );
}

AvatarItem.defaultProps = {
  url: "",
  title: "",
  sublitile: "",
  size: "medium",
};

export default AvatarItem;
