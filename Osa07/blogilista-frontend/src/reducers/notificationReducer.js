import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer
