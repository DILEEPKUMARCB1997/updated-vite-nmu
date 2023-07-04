import { createSlice } from '@reduxjs/toolkit'
const pagesList = {
  0: 'general',
  1: 'mail',
  2: 'telegram',
  3: 'snmp',
  4: 'advanced',
  5: 'notification'
}

const preferenceSlice = createSlice({
  name: 'preferenceSlice',
  initialState: {
    loading: false,
    selectedIndex: 0,
    selectedPage: 'general'
  },
  reducers: {
    clearPreferencesData: (state) => {
      return {
        ...state,
        loading: false,
        selectedIndex: 0,
        selectedPage: 'general'
      }
    },
    setSelectIndex: (state, action) => {
      return {
        ...state,
        selectedIndex: action.payload,
        selectedPage: pagesList[action.payload]
      }
    }
  }
})
export const { clearPreferencesData, setSelectIndex } = preferenceSlice.actions

export const preferenceSelector = (state) => {
  const { loading, selectedIndex, selectedPage } = state.preference
  return { loading, selectedIndex, selectedPage }
}

export default preferenceSlice
