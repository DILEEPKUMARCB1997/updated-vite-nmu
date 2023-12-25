import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const multipleSnack = false
const snackSlice = createSlice({
  name: 'snackSlice',
  initialState: {
    snacks: []
  },
  reducers: {
    openSnack: (state, action) => {
      if (multipleSnack) {
        return {
          ...state,
          snacks: [...state.snacks, action.payload]
        }
      }
      return {
        ...state,
        snacks: [action.payload]
      }
    },
    closeSnack: (state, { payload }) => {
      return {
        ...state,
        snacks: state.snacks.filter((id) => id !== payload)
      }
    }
  }
})
export const { openSnack, closeSnack } = snackSlice.actions
const memoizedSnackSelector = (state) => state.snack
export const snackSelector = createSelector(memoizedSnackSelector, ({ snacks }) => ({ snacks }))

export default snackSlice
