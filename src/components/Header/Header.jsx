import React from 'react';
import style from './Header.module.css'
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/logo.png'
import {Button} from "@mui/material";


const Header = (props) => {

  return (
    <header className={style.header}>
      <div>
        <NavLink to="/profile">
          <img src={logo} alt=""/>
          Social Network</NavLink>
      </div>
      <div>
        {props.isAuth
          ? <div>{props.login} <Button onClick={props.logout}>Log out</Button></div>
          : <NavLink to="/login">Login</NavLink>}
      </div>
    </header>
  );
}

export default Header;