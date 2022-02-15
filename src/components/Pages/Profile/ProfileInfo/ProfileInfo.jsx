import React from 'react';
import style from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = (props) => {
  return (
    <div>
      <div className={style.profileBackground}>
        <img
          src="https://static3.depositphotos.com/1000454/256/i/600/depositphotos_2567474-stock-photo-wide-panorama-of-french-alps.jpg"
          alt=""/>
      </div>
      <div className={style.descriptionBlock}>
        <div className={style.item}>
          <img src="https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg" alt=""/>
          <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
