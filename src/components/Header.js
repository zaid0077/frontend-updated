import React from "react";
import logo from "../assests/tdcx-logo.png";
import { useHistory } from "react-router-dom";
import { IconButton } from '@material-ui/core';
import "../styles/Header.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



export default function Header() {
  const history = useHistory();

  const logout = () => {
    localStorage.clear()
    history.push('/')
  }


  return (
    <div className="header">
      <AccountCircleIcon className="header-icon" fontSize="large" />
      <img
        className="header-logo"
        src={logo}
        alt="logo"
      />
      <IconButton edge="end">
        <ExitToAppIcon onClick={() => logout()}  className="header-icon" fontSize="large" />
      </IconButton>
    </div>
  );
}
