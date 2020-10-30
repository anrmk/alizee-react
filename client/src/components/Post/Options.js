import React, {useEffect} from "react";

import { VerticalList, ItemList } from "../List";

import ReadMore from "@material-ui/icons/ForwardOutlined";
import Share from "@material-ui/icons/ShareOutlined";
import Unfollow from "@material-ui/icons/ExitToAppOutlined";

function Options({
  id,
  userId,
  username,
  onFollowClick,
  onGoToClick,
  onShareClick,
}) {

  useEffect(() => {
    console.log("Load", id, userId, username)
  }, [])

  const handleUnfollow = (e) => {
    console.log("handleUnfollow")
    e.preventDefault();
    onFollowClick && onFollowClick(id);
  };

  const handleGoTo = (e) => {
    e.preventDefault();
    onGoToClick && onGoToClick(id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    onShareClick && onShareClick({ id, userId });
  };

  return (
    <VerticalList className="list-group-flush ">
      <ItemList onClick={handleUnfollow}>
        <Unfollow /> Unfollow
      </ItemList>
      <ItemList onClick={handleGoTo}>
        <ReadMore /> Go to post
      </ItemList>
      <ItemList onClick={handleShare}>
        <Share /> Share
      </ItemList>
    </VerticalList>
  );
}

export default Options;
