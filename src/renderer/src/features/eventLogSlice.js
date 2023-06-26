/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../main/utils/IPCEvents'
// import { customEventSortFilter, filterByDate } from '../components/eventlog/CustomData'
//import { openDialog } from './dialogSlice'

export const initEventLogHistoryData = (payload) => (dispatch) => {
  const { type } = payload
  switch (type) {
    case 'event':
      dispatch(updateEventHistory(data))
      break
    case 'trap':
      dispatch(
        requestHistoryData({
          type,
          sourceIP: '',
          ge: '',
          le: ''
        })
      )

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
      case 'event':
        dispatch(updateEventHistory(data))
        break
      case 'trap':
        dispatch(updateTrapHistory(data))
        break
      case 'syslog':
        dispatch(updateSyslogHistory(data))
        break
      default:
        break
    }
  })

  window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
}

const eventLogSlice = createSlice({
  name: 'eventLogSlice',
  initialState: {
    eventData: [],
    eventHistoryData: [],
    trapData: [],
    trapHistoryData: [],
    syslogData: [],
    syslogHistoryData: [],
    customEventData: [],
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
    },
    updateTrapHistory: (state, { payload }) => {
      return { ...state, trapHistoryData: payload }
    },
    updateLogData: (state) => {
      const filteredEventLogData = filterByDate([...state.eventData])
      const filteredTrapLogData = filterByDate([...state.trapData])
      const filteredSyslogLogData = filterByDate([...state.syslogData])
      const filterCustomLogData = filterByDate([...state.customEventData])
      const filterCustomLogDailyData = filterByDate([...state.customEventDailyData])
      return {
        ...state,
        eventData: filteredEventLogData,
        syslogData: filteredSyslogLogData,
        trapData: filteredTrapLogData,
        customEventData: filterCustomLogData,
        customEventDailyData: filterCustomLogDailyData
      }
    },
    clearEventData: (state) => {
      return { ...state, eventData: [] }
    },
    clearSyslogData: (state) => {
      return { ...state, syslogData: [] }
    },
    clearTrapData: (state) => {
      return { ...state, trapData: [] }
    },
    clearCustomEventData: (state) => {
      return { ...state, customEventData: [] }
    },
    clearHistoryData: (state) => {
      return {
        ...state,
        eventHistoryData: [],
        trapHistoryData: [],
        syslogHistoryData: []
      }
    },

    updateEventHistory: (state, action) => {
      const { payload } = action
      return { ...state, eventHistoryData: payload }
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

  updateTrapHistory: (state, { action }) => {
    const { payload } = action
    return { ...state, trapHistoryData: payload }
  },

  updateSyslogHistory: (state, { payload }) => {
    return { ...state, syslogHistoryData: payload }
  },
  clearTrapData: (state, { payload }) => {
    return { ...state, trapData: [payload] }
  }
})

export const {
  updateCustomHistory,
  updateCustomEventDaily,
  updateEventHistory,
  clearSyslogData,
  updateTrapHistory,
  updateSyslog,
  updateSyslogHistory,
  updateEvent,
  updateLogData,
  clearEventData,
  clearTrapData,
  clearHistoryData
} = eventLogSlice.actions

export const eventLogSelector = (state) => {
  const {
    eventData,
    eventHistoryData,
    trapData,
    trapHistoryData,
    syslogData,
    syslogHistoryData,
    customEventData,
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
    customEventData,
    customEventDailyData,
    customEventHistoryData,
    customEventListData,
    beepSoundStart,
    openBeepDialog
  }
}

export default eventLogSlice

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

const customEventSortFilter = (Items) => {
  let sortedItems = Items.sort(function (a, b) {
    return new Date(b.createAt) - new Date(a.createAt)
  })
  return sortedItems
}
