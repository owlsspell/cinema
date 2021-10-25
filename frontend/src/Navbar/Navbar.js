import React, { Component, useState } from "react";
// import { Icon } from "antd";
import s from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";

const Navbar = () => {
  const [isNavOpen, toogleOpen] = useState(false);
  const [acticeTab, toogleTab] = useState(0);

  const handleClick = () => {
    isNavOpen ? toogleOpen(false) : toogleOpen(true);
  };

  // set tabs
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={isNavOpen ? s.wrapper + " " + s.isNavOpen : s.wrapper}  onClick={isNavOpen? handleClick: null} >
      <div className={s.nav} >

        <svg
          onClick={handleClick}
          className={s.navIcon}
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill={ "#ffffff" }
          // fill={isNavOpen ? "#ffffff" : "#030306"}
        >
          <path d="M0,0h24v24H0V0z" fill="none" />
          <path d="M3,18h13v-2H3V18z M3,13h10v-2H3V13z M3,6v2h13V6H3z M21,15.59L17.42,12L21,8.41L19.59,7l-5,5l5,5L21,15.59z" />
        </svg>
        <div className={s.navBody}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
          >
            <Tab className={0 ==acticeTab? s.tabs + " " +s.active :s.tabs} onClick={()=>toogleTab(0)}  label={<Link className={s.links} to="/">Home</Link>}  />
            <Tab className={1==acticeTab? s.tabs + " " +s.active :s.tabs}  onClick={()=>toogleTab(1)}  label={<Link className={s.links}  to="/about">About</Link>}  />
            <Tab className={2 ==acticeTab? s.tabs + " " +s.active :s.tabs} onClick={()=>toogleTab(2)}  label={<Link className={s.links}  to="/users">Users</Link>}  />
            <Tab className={3 ==acticeTab? s.tabs + " " +s.active :s.tabs} onClick={()=>toogleTab(3)}  label={<Link className={s.links}  to="/login">Login</Link>}  />
            
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
