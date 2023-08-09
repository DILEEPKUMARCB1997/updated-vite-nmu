/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

export const openAlertDialog = (payload) => (dispatch) => {
  dispatch(openDialog(payload.alertType))
  dispatch(setAlertText(payload.alertText))
}
const dialogSlice = createSlice({
  name: 'dialogSlice',
  initialState: { dialogs: [] },
  reducers: {
    openDialog: (state, { payload }) => {
      if (state.dialogs.includes(payload)) {
        return state
      }
      return {
        ...state,
        dialogs: [...state.dialogs, payload]
      }
    },
    closeDialog: (state, { payload }) => {
      return {
        ...state,
        dialogs: state.dialogs.filter((id) => id !== payload)
      }
    },
    setAlertText: (state, action) => {
      return {
        ...state,
        alertText: action.payload
      }
    }
  }
})

export const { openDialog, closeDialog, setAlertText } = dialogSlice.actions

export const dialogSelector = (state) => {
  const { dialogs } = state.dialog
  return { dialogs }
}

export default dialogSlice
