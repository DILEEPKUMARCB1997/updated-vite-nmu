/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

export const initEventLogHistroyData = (payload) => (dispatch) => {
  const { type } = payload
  switch (type) {
    case 'trap':
      dispatch(
        requestHistoryData({
          type,
          sourceIP: '',
          ge: '',
          le: ''
        })
      )
      dispatch(openDialog('trapHistory'))
      break
  }
}
export const requestHistoryData = (param) => (dispatch) => {
  ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'trap':
        dispatch(updateTrapHistory(data))
        break
    }
  })

  ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
}

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
    },
    openDialog: (state, { action }) => {
      if (state.dialogs.includes(action.payload)) {
        return state
      }
      return {
        ...state,
        dialogs: [...state.dialogs, action.payload]
      }
    },
    updateTrapHistory: (state, { action }) => {
      const { payload } = action
      return { ...state, trapHistoryData: payload }
    },
    clearTrapData: (state, { payload }) => {
      return { ...state, trapData: [payload] }
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
