import React from 'react';
import style from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../../assets/images/user.png";


const ProfileInfo = (props) => {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      <div className={style.profileBackground}>
        <img
          src="https://static3.depositphotos.com/1000454/256/i/600/depositphotos_2567474-stock-photo-wide-panorama-of-french-alps.jpg"
          alt=""/>
      </div>
      <div className={style.descriptionBlock}>
        <div className={style.item}>
          <img src={props.profile.photos.large || userPhoto} alt=""/>
          {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

          <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
          <ProfileData profile={props.profile} />
        </div>
      </div>
    </div>
  );
};

const ProfileData = (props) => {
  return (
    <div>
      <div>
        <div><b>Full name: </b>{props.profile.fullName}</div>
      </div>
      <div>
        <b>Looking for a job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}
      </div>
      {props.profile.lookingForAJob &&
        <div>
          <b>Description:</b> {props.profile.lookingForAJobDescription}
        </div>}
      <div>
        <b>About me: </b>
      </div>
      <div>
        <b>Constacts: </b>{Object.keys(props.profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key}  contactValue={props.profile.contacts[key]}/>
      })}
      </div>
    </div>
  )
}

const Contact = ({contactTitle, contactValue}) => {
  return (
    <div  style={{paddingLeft: '15px'}}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  )
}

export default ProfileInfo;
