/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const eventLogSlice = createSlice({
  name: 'eventLog',
  initialState: {
    eventData: [],
    eventHistoryData: [],
    trapData: [],
    trapHistoryData: [],
    syslogData: [],
    syslogHistoryData: [],
    cusromEventData: [],
    customEventDailyData: [],
    customEventHistoryData: [],
    customEventListData: [],
    beepSoundStart: false,
    openBeepDialog: false
  },
  reducers: {
    updateCustomHistory: (state, action) => {
      const { payload } = action
      return { ...state, customEventHistoryData: payload }
    },
    updateCustomEventDaily: (state) => {
      const customEventSortFilter = (Items) => {
        let sortedItems = Items.sort(function (a, b) {
          return new Date(b.createAt) - new Date(a.createAt)
        })
        return sortedItems
      }
      const filterByDate = (Items) => {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        today = `${yyyy}-${mm}-${dd}`
        return Items.filter(function (item) {
          return new Date(item.createAt).getTime() >= new Date(today).getTime()
        })
      }

      const sortedItems = customEventSortFilter([...state.customEventHistoryData])
      const filteredCustomEventsDailyData = filterByDate([...state.customEventHistoryData])
      return {
        ...state,
        customEventDailyData: filteredCustomEventsDailyData,
        customEventListData: sortedItems.slice(0, 30)
      }
    },
    clearHistoryData: (state) => {
      return {
        ...state,
        eventHistoryData: [],
        trapHistoryData: [],
        syslogHistoryData: [],
        customEventHistoryData: []
      }
    }
  }
})

export const { updateCustomHistory, updateCustomEventDaily, clearHistoryData } =
  eventLogSlice.actions
export const eventLogSelector = (state) => {
  const {
    eventData,
    eventHistoryData,
    trapData,
    trapHistoryData,
    syslogData,
    syslogHistoryData,
    cusromEventData,
    customEventDailyData,
    customEventHistoryData,
    customEventListData,
    beepSoundStart,
    openBeepDialog
  } = state.eventLog
  return {
    eventData,
    eventHistoryData,
    trapData,
    trapHistoryData,
    syslogData,
    syslogHistoryData,
    cusromEventData,
    customEventDailyData,
    customEventHistoryData,
    customEventListData,
    beepSoundStart,
    openBeepDialog
  }
}

export default eventLogSlice
