import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import iconSrc from "../assets/img/logo.png";

import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import HomeIcon from "@material-ui/icons/HomeOutlined";
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { Avatar } from "@material-ui/core";

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

function Header(props) {
  const match = useRouteMatch();

  const { avatarUrl } = props;
  const { onSignOut } = props;

  const handleSignOut = () => {
    onSignOut && onSignOut();
  }

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const [value, setValue] = React.useState('recents');

  return (
    // <BottomNavigation value={value} onChange={(event, newValue) => {setValue(newValue)}}>
    //   <BottomNavigationAction label="Recents" value="recents" icon={<HomeIcon />} />
    //   <BottomNavigationAction label="Favorites" value="favorites" icon={<AddCircleOutlineOutlinedIcon />} />
    //   <BottomNavigationAction label="Nearby" value="nearby" icon={<StorefrontOutlinedIcon />} />
    //   <BottomNavigationAction label="Folder" value="folder" icon={<SendOutlinedIcon />} />
    // </BottomNavigation>
    <div className="navbar navbar-expand-lg navbar-light bg-light sticky-top py-1">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          <img
            src={iconSrc}
            className="mr-2"
            width="30"
            height="30"
            alt=""
            loading="lazy"
          />
           Alizee Meet {match.isExact}
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarContent">
          <form className="form-inline my-2 my-lg-0 ml-auto">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
            />
            <button className="sr-only" type="submit">
              Search ...
             </button>
          </form>

          <div className="navbar-nav ml-auto">
            <li className="nav-item text-center">
              <Link className="nav-link" to={"/"}>
                <HomeIcon />
                <span className="d-block">Home</span>
              </Link>
            </li>

            <li className="nav-item text-center">
              <Link className="nav-link" to={"/"}>
                <StorefrontOutlinedIcon />
                <span className="d-block">Shop</span>
              </Link>
            </li>

            <li className="nav-item text-center">
              <Link className="nav-link" to={"/chat"}>
                <SendOutlinedIcon />
                <span className="d-block">Message</span>
              </Link>
            </li>

            <li className="nav-item text-center">
              <Link className="nav-link" to={"/"}>
                <NotificationsActiveIcon />
                <span className="d-block">Notification</span>
              </Link>
            </li>
                <li className="nav-item text-center">
                  <Link className="nav-link" to={"/me"} >
                    <Avatar src={avatarUrl} />
                  </Link>
                </li>

                <li className="nav-item text-center">
                  <Link className="nav-link" to="/signIn" >
                    <div onClick={() => handleSignOut()}>
                      <ExitToAppIcon />
                      <span className="d-block">Logout</span>
                    </div>
                  </Link>
                </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
