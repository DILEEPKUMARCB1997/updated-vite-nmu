/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../main/utils/IPCEvents'
import { customEventSortFilter, filterByDate } from '../components/eventlog/CustomData'

export const initEventLogHistoryData = (payload) => (dispatch) => {
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
      // dispatch(openDialog('trapHistory'))
      break
    case 'syslog':
      dispatch(
        requestHistoryData({
          type,
          sourceIP: '',
          ge: '',
          le: ''
        })
      )
      // dispatch(openDialog('syslogHistory'))
      break
  }
}
export const requestHistoryData = (param) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'trap':
        dispatch(updateTrapHistory(data))
        break
    }
  })

  window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
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
      const sortedItems = customEventSortFilter([...state.customEventHistoryData])
      const filteredCustomEventsDailyData = filterByDate([...state.customEventHistoryData])
      return {
        ...state,
        customEventDailyData: filteredCustomEventsDailyData,
        customEventListData: sortedItems.slice(0, 30)
      }
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

  clearSyslogData: (state, { payload }) => {
    return { ...state, syslogData: payload }
  },

  updateSyslog: (state, { payload }) => {
    const filteredSyslogData = filterByDate([...state.syslogData])
    // const { payload } = action;
    filteredSyslogData.push(payload)
    return { ...state, syslogData: filteredSyslogData }
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
})

export const {
  updateCustomHistory,
  updateCustomEventDaily,
  clearHistoryData,
  openDialog,
  clearSyslogData,
  updateTrapHistory,
  updateSyslog
} = eventLogSlice.actions

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
