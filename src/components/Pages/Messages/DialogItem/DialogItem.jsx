import React from 'react';
import style from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
  return (
      <div className={style.dialog}>
        <img src="https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg" alt=""/>
        <NavLink to={`dialog/${props.id}`} className={navData => navData.isActive ? style.active : style.dialog}>{props.name}</NavLink>
      </div>
  );
};

export default DialogItem;
