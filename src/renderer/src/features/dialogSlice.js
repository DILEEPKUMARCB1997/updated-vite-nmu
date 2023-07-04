/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
  name: 'dialogSlice',
  initialState: { dialogs: [], isAppPreferencesDialogOpen: [] },
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
    }
  }
})

export const { openDialog, closeDialog } = dialogSlice.actions

export const dialogSelector = (state) => {
  const { dialogs, isAppPreferencesDialogOpen } = state.dialog
  return { dialogs, isAppPreferencesDialogOpen }
}

export default dialogSlice
