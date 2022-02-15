import {usersAPI} from "../api/api";

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
  users: [
    // {id: 1, followed: true, fullName: "Alex", status: 'Some status', location: {country: 'Belarus', city: 'Minsk'}},
    // {id: 2, followed: false, fullName: "Viktor", status: 'Some status', location: {country: 'Belarus', city: 'Minsk'}},
    // {id: 3, followed: false, fullName: "Andrew", status: 'Some status', location: {country: 'Poland', city: 'Warsaw'}},
    // {id: 4, followed: true, fullName: "Natasha", status: 'Some status', location: {country: 'USA', city: 'New-York'}},
  ],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 2,
  isFetching: true,
  followingProgress: []
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: true}
          }
          return user
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: false}
          }
          return user
        })
      }
    case SET_USERS: {
      return {...state, users: action.users}
    }
    case SET_TOTAL_USERS_COUNT: {
      return {...state, totalUsersCount: action.count}
    }
    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.currentPage}
    }
    case TOGGLE_IS_FETCHING: {
      return {...state, isFetching: action.isFetching}
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter(id => id !== action.userId)
      }
    }
    default:
      return state
  }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, currentPage: page})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
})

export const getUsers = (currentPage, pageSize) => async(dispatch) => {
  dispatch(toggleIsFetching(true))
  let response = await usersAPI.getUser(currentPage, pageSize)

  dispatch(toggleIsFetching(false))
  dispatch(setUsers(response.items))
  dispatch(setTotalUsersCount(response.totalCount))
}


const  followUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)

  if (response.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingProgress(false, userId))

}

export const follow = (userId) => (dispatch) => {
  followUnfollow(dispatch, userId, usersAPI.follow(userId), followSuccess)
}

export const unfollow = (userId) => (dispatch) => {
  followUnfollow(dispatch, userId, usersAPI.unfollow(userId), unfollowSuccess)
}


export default usersReducer;