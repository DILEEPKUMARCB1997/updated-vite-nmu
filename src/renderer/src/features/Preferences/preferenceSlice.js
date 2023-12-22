import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
const pagesList = {
  0: 'general',
  1: 'mail',
  2: 'telegram',
  3: 'snmp',
  4: 'advanced'
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
    },
    updateLoadingVisible: (state) => {
      return { ...state, loading: !state.loading }
    }
  }
})
export const { clearPreferencesData, setSelectIndex, updateLoadingVisible } =
  preferenceSlice.actions
const memoizedPreferenceSelector = (state) => state.preference
export const preferenceSelector = createSelector(
  memoizedPreferenceSelector,
  ({ loading, selectedIndex, selectedPage }) => ({ loading, selectedIndex, selectedPage })
)

export default preferenceSlice
