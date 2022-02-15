const SEND_MESSAGE = 'messages/SEND_MESSAGE'

let initialState = {
  messagesData: [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'What\'s new?'}
  ],
  dialogData: [
    {id: 1, name: 'Viktor'},
    {id: 2, name: 'Natasha'},
    {id: 3, name: 'Kirill'},
    {id: 4, name: 'Vladimir'},
    {id: 5, name: 'Alex'}
  ]
}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messagesData: [...state.messagesData, {id: 4, message: action.newMessageBody}]
      }
    default:
      return state
  }
}

export const sendMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody })

export default messagesReducer