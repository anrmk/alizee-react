import React from "react";
import { Link } from "react-router-dom";

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { POST_ROUTE } from "../../constants/routes";

function Tools({ id, commentable, onShareClick, onFavoriteClick, onBuyClick}) {
  return  (
    <div className="nav mb-2">
      <a className="nav-link active" href="#" onClick={onFavoriteClick}><FavoriteBorderIcon /></a>
      {commentable &&  <Link className="nav-link" to={`${POST_ROUTE}/${id}`}><ChatBubbleOutlineOutlinedIcon /></Link> }
      <a className="nav-link" href="#" onClick={onShareClick}><ShareOutlinedIcon /></a>
      <a className="nav-link" href="#" onClick={onBuyClick}><MonetizationOnOutlinedIcon /></a>
    </div>
  )
}
export default Tools;