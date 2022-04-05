import React from 'react';
import MyPostsContainer from "./MyPost/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../../common/Preloader/Preloader";

const Profile = (props) => {
  if(!props.profile){
    return (<Preloader />)
  }

  return (
    <div>
      <ProfileInfo profile={props.profile} isOwner={props.isOwner} savePhoto={props.savePhoto}
                   status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer/>
    </div>
  )
}
export default Profile