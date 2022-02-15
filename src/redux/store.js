import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state :{
      profilePage : {
        postData : [
          { id: 1, text : "Hello, it's my first post" },
          { id: 2, text : "la la la la la" }
        ],
        newPostText: ''
      },
      messagesPage:{
        messagesData : [
          {id: 1, message: 'Hello'},
          {id: 2, message: 'How are you?'},
          {id: 3, message: 'What\'s new?'}
        ],
        dialogData : [
          {id: 1, name: 'Viktor'},
          {id: 2, name: 'Natasha'},
          {id: 3, name: 'Kirill'},
          {id: 4, name: 'Vladimir'},
          {id: 5, name: 'Alex'}
        ],
        newMessageText: ''
      },
      sidebar: {
        friendsData:[
          {id: 1, name: "Alex"},
          {id: 2, name: "Viktor"},
          {id: 3, name: "Andrew"},
          {id: 4, name: "Sergey"},
          {id: 5, name: "Viktor"},
          {id: 6, name: "Natasha"},
          {id: 7, name: "Vladimir"},
          {id: 8, name: "Elizabeth"},
          {id: 9, name: "Katherina"}
        ]
      }
    },
  _callSubscriber() {

    },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.messagesPage= messagesReducer(this._state.messagesPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._callSubscriber(this._state)
  }
}



export default store