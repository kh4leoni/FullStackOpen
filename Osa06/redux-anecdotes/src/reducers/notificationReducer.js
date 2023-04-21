import { createSlice } from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'



const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notification(state, action) {
      state = action.payload
      return state
    }
  }
})


export const { notification } = notificationSlice.actions

export const setNotification = (action, time) => {
  return async dispatch => {
    dispatch(notification(action))
    setTimeout(() => {
      dispatch(notification(""))
    }, time * 1000)
  }
}
export default notificationSlice.reducer