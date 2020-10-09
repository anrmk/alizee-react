import React from "react";

import { Avatar } from "../Avatar";

function AvatarItem(props) {
  return (
    <div className="d-flex justify-content-start align-items-center w-100">
      <Avatar size={props.size} url={props.url} />
      <div className="">
        <strong className="d-block">{props.title}</strong>
        <div className="text-truncate w-100 ">
          <small className="text-muted">{props.subtitle}</small>
        </div>
      </div>
    </div>
  );
}

AvatarItem.defaultProps = {
  url: "",
  title: "title",
  sublitile: "sub title",
  size: "medium",
};

export default AvatarItem;
