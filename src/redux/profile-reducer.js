import {profileApi} from "../api/api";

const ADD_POST = 'profile/ADD_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'


let initialState = {
  postData: [
    {id: 1, text: "Hello, it's my first post"},
    {id: 2, text: "la la la la la"}
  ],
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postData: [...state.postData, {id: 3, text: action.newPostText}]
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    default:
      return state
  }
}
//action creators
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile})
export const setStatus = (status) => ({type: SET_STATUS, status: status})

// thunks creators
export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileApi.getProfile(userId)
    dispatch(setUserProfile(response))
}
export const getUserStatus = (status) => async (dispatch) => {
  let response = await profileApi.getStatus(status)
  dispatch(setStatus(response))
}
export const updateUserStatus = (status) => async (dispatch) => {
  let response = await profileApi.updateStatus(status)
    if (response.data.ResultCode === 0) {
      dispatch(setStatus(status))
    }
}


export default profileReducer;