import React from "react";

import { Avatar } from "../Avatar";

function AvatarItem({ 
  url,
  title,
  subtitle,
  size,
  className,
  children
}) {
  return (
    <div className="avatar-item d-flex justify-content-start align-items-center text-truncate">
      <Avatar size={size} url={url} className={className} />
      <div>
        {children ?? (
          <>
            <div className="avatar-title mb-0">{title}</div>
            <small className="text-muted">{subtitle}</small>
          </>
        )}
      </div>
    </div>
  );
}

AvatarItem.defaultProps = {
  url: "",
  title: "",
  sublitile: "",
  size: "medium",
  className: "mr-2", 
};

export default AvatarItem;
