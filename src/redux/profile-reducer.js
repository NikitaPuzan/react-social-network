import {profileApi} from "../api/api";

const ADD_POST = 'profile/ADD_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'


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
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile : {...state.profile, photos: action.photos}
      }
    default:
      return state
  }
}
//action creators
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile})
export const setStatus = (status) => ({type: SET_STATUS, status: status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

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
export const savePhoto = (file) => async (dispatch) => {
  let response = await profileApi.savePhoto(file)
    if (response.data.ResultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos))
    }
}


export default profileReducer;