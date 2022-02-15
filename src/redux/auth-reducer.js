import {authAPI} from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_USER_AUTH = 'auth/SET_USER_AUTH'

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  rememberMe: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case SET_USER_AUTH:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

export const setUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth}
})
export const setUserAuth = (email, password, rememberMe) => ({type: SET_USER_AUTH, data: {email, password, rememberMe}})


export const getAuthUserData = () => async(dispatch) => {
  let response = await authAPI.me()
  if (response.resultCode === 0) {
    let {id, email, login} = response.data
    dispatch(setUserData(id, email, login, true))
  }
}

export const login = (email, password, rememberMe, setStatus) => async(dispatch) => {
  let response = await authAPI.login(email, password, rememberMe)
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    setStatus({error: response.data.messages})
  }
}

export const logout = (email, password, rememberMe) => async(dispatch) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false))
  }
}


export default authReducer