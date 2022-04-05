import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "2f9d5ee7-fccd-4b50-9b20-72bb64968ec7"
  }
})

export const usersAPI = {
  getUser(currentPage = 1, pageSize = 5)  {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
  },
  unfollow  (userId) {
    return instance.delete(`follow/${userId}`).then(response => response.data)
  },
  follow (userId) {
    return instance.post(`follow/${userId}`).then(response => response.data)
  }
}
export const profileApi = {
  getProfile(userId)  {
    return instance.get(`profile/${userId}`).then(response => response.data)
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`).then(response => response.data)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status })
  },
  savePhoto(photoFile) {
    const formData = new FormData()
    formData.append("image", photoFile)
    return instance.put(`profile/photo`, formData,  {
      header: {
        'Content-Type' : 'multipart/form-data'
      }
    })
  }
}

export const authAPI = {
  me()  {
    return instance.get(`auth/me`).then(response => response.data)
  },
  login(email, password, rememberMe)  {
    return instance.post(`auth/login`, {email, password, rememberMe})
  },
  logout()  {
    return instance.delete(`auth/login`)
  },
}