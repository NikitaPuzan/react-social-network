import React from 'react';
import style from "./Users.module.css";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User/User";
import {Container} from "@mui/material";


let Users = ({onPageChanged, pageSize, followingProgress, users, currentPage, totalUsersCount, ...props}) => {

  return (
    <Container maxWidth="sm">
      <div className={style.content}>
        <Paginator pageSize={pageSize} totalUsersCount={totalUsersCount} onPageChanged={onPageChanged}
                   currentPage={currentPage}/>
        <div className='content'>
          {users.map(u => <User key={u.id} user={u} followingProgress={followingProgress}
                                follow={props.follow} unfollow={props.unfollow}/>)}
        </div>
      </div>
    </Container>
  );
}

export default Users;

