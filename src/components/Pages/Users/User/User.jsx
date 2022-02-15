import React from 'react';
import userPhoto from "../../../../assets/images/user.png";
import style from "./User.module.css";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

let User = ({user, followingProgress, unfollow, follow}) => {
  return (
      <div key={user.id}>
        <div className={style.userInfo}>
          <div >
            <div>
              <NavLink to={'/profile/' + user.id}>
                <img className={style.userLogo}
                     src={user.photos.small != null ? user.photos.small : userPhoto} alt=""/>
              </NavLink>
            </div>
            <div>
              {user.followed
                && <Button disabled={followingProgress.some(id => id === user.id)}
                           variant="contained"
                           onClick={() => {
                             unfollow(user.id)
                           }}>
                  Unfollow</Button>
              }
              { !user.followed && <Button disabled={followingProgress.some(id => id === user.id)}
                          variant="contained"
                          onClick={() => {
                            follow(user.id)
                          }}>
                  Follow</Button>}
            </div>
          </div>
          <div>
              <div>{user.name}</div>
              <div>{user.status} {!user.status && 'Status does not exist'}</div>
          </div>
        </div>
      </div>
  )
}


export default User;

