import { createSlice } from '@reduxjs/toolkit'

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
    }
  }
})

export const { openDialog, closeDialog } = dialogSlice.actions

export const dialogSelector = (state) => {
  const { dialogs } = state.dialog
  return { dialogs }
}

export default dialogSlice
