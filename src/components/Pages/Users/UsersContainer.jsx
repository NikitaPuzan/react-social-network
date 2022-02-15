import React, {useEffect} from 'react';
import {connect, useSelector} from "react-redux";
import Users from "./Users";
import {
  follow, getUsers,
  setCurrentPage,
  toggleFollowingProgress,
  unfollow
} from "../../../redux/users-reducer";
import Preloader from "../../common/Preloader/Preloader";
import * as selectors from './../../../redux/selectors'


const UsersContainer = (props) => {
  const users = useSelector(selectors.users )
  const pageSize = useSelector(selectors.pageSize )
  const currentPage = useSelector(selectors.currentPage )
  const totalUsersCount = useSelector(selectors.totalUsersCount )
  const isFetching = useSelector(selectors.isFetching )
  const followingProgress = useSelector(selectors.followingProgress )

  useEffect(() => {
    props.getUsers(currentPage, pageSize)
  }, []);

  const onPageChanged = (pageNumber) => {
    props.setCurrentPage(pageNumber)
    props.getUsers(pageNumber, pageSize)
  }

  return <>
    {isFetching ? <Preloader/> :
      <Users currentPage={currentPage}
             onPageChanged={onPageChanged}
             pageSize={pageSize}
             users={users}
             unfollow={props.unfollow}
             follow={props.follow}
             followingProgress={followingProgress}
             totalUsersCount={totalUsersCount}
      />}
  </>
}

export default connect(null , {follow, unfollow, getUsers,
    setCurrentPage, toggleFollowingProgress}
)(UsersContainer)