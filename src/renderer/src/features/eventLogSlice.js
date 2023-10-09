import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../main/utils/IPCEvents'
// import { customEventSortFilter, filterByDate } from '../components/eventlog/CustomData'
//import { openDialog } from './dialogSlice'

export const updateEventLog = (payload) => (dispatch) => {
  const { type, data } = payload
  console.log(data)

  switch (type) {
    case 'trap':
      dispatch(updateTrap(data))
      break
    case 'syslog':
      dispatch(updateSyslog(data))
      break
    case 'event':
      dispatch(updateEvent(data))
      break
    case 'custom':
      dispatch(updateCustomEvent(data))
      dispatch(initEventDailyData({ types: 'custom' }))
      break
    default:
      break
  }
}
// export const initEventDailyData = (payload) => (dispatch) => {
//   const { types } = payload
//   ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
//     const { type, data } = arg
//     switch (type) {
//       case 'custom':
//         dispatch(updateCustomHistory(data))
//         dispatch(updateCustomEventDaily())
//         dispatch(clearHistoryData())
//         break
//       default:
//         break
//     }
//   })

export const initEventDailyData = (payload) => (dispatch) => {
  const { types } = payload
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'custom':
        dispatch(updateCustomHistory(data))
        dispatch(updateCustomEventDaily())
        dispatch(clearHistoryData())
        break
      default:
        break
    }
  })

  window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, {
    type: types,
    sourceIP: '',
    ge: '',
    le: ''
  })
}

// export const initEventLogHistoryData = (payload) => (dispatch) => {
//   const { type } = payload
//   switch (type) {
//     case 'event':
//       dispatch(updateEventHistory(data))
//       break
//     case 'trap':
//       dispatch(
//         requestHistoryData({
//           type,
//           sourceIP: '',
//           ge: '',
//           le: ''
//         })
//       )
//       break
//     case 'syslog':
//       dispatch(
//         requestHistoryData({
//           type,
//           sourceIP: '',
//           ge: '',
//           le: ''
//         })
//       )

//       // dispatch(openDialog('syslogHistory'))
//       break
//   }
// }
export const requestHistoryData = (param) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    console.log(arg)
    const { type, data } = arg
    console.log(type)
    console.log(data)
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
      case 'custom':
        dispatch(updateCustomEvent(data))
        dispatch(initEventDailyData({ types: 'custom' }))
        break
      default:
        break
    }
  })

  window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
}

export const requestInitData = (param) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    console.log(type)
    console.log(data)
    switch (type) {
      case 'event':
        dispatch(updateEvent(data))
        break
      case 'trap':
        dispatch(updateTrap(data))
        break
      case 'syslog':
        dispatch(updateSyslog(data))
        break
      case 'custom':
        dispatch(updateCustomEvent(data))
        dispatch(initEventDailyData({ types: 'custom' }))
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
    updateBeepSoundStart: (state) => {
      return { ...state, beepSoundStart: true, openBeepDialog: true }
    },
    updateBeepSoundStop: (state) => {
      return { ...state, beepSoundStart: false, openBeepDialog: false }
    },
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
    updateSyslogHistory: (state, { payload }) => {
      return { ...state, syslogHistoryData: payload }
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
    },

    updateEvent: (state, { payload }) => {
      const filteredEventData = filterByDate([...state.eventData])
      console.log(filteredEventData)
      filteredEventData.push(payload)
      return { ...state, eventData: filteredEventData }
    },
    updateTrap: (state, { payload }) => {
      const filteredTrapData = filterByDate([...state.trapData])
      filteredTrapData.push(payload)
      return { ...state, trapData: filteredTrapData }
    },

    updateSyslog: (state, { payload }) => {
      const filteredSyslogData = filterByDate([...state.syslogData])
      filteredSyslogData.push(payload)
      return { ...state, syslogData: filteredSyslogData }
    },
    updateCustomEvent: (state, action) => {
      const filteredCustomEventData = filterByDate([...state.customEventData])
      const filteredCustomEventDailyData = filterByDate([...state.customEventDailyData])
      let EventList = [...state.customEventListData]
      const { payload } = action
      filteredCustomEventData.push(payload)
      filteredCustomEventDailyData.push(payload)
      EventList.push(payload)
      let sortedEventList = customEventSortFilter([...EventList])
      return {
        ...state,
        customEventData: filteredCustomEventData
      }
    }
  }
})

export const {
  updateTrap,
  updateSyslog,
  updateEvent,
  updateCustomEvent,
  updateEventHistory,
  updateTrapHistory,
  updateSyslogHistory,
  updateCustomHistory,
  clearHistoryData,
  clearEventData,
  clearTrapData,
  clearSyslogData,
  updateLogData,
  updateCustomEventDaily,
  updateBeepSoundStart,
  updateBeepSoundStop
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

/*
import { ipcRenderer } from 'electron'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../main/utils/IPCEvents'

// import { openDialog } from './dialog'

// const name = 'eventLog'

export const updateEventLog = (payload) => (dispatch) => {
  const { type, data } = payload
  switch (type) {
    case 'trap':
      dispatch(updateTrap(data))
      break
    case 'syslog':
      dispatch(updateSyslog(data))
      break
    case 'event':
      dispatch(updateEvent(data))
      break
    case 'custom':
      //console.log('custom', data);
      dispatch(updateCustomEvent(data))
      dispatch(initEventDailyData({ types: 'custom' }))
      break
    default:
      break
  }
}

export const initEventLogHistoryData = (payload) => (dispatch) => {
  const { type } = payload
  switch (type) {
    case 'event':
      dispatch(
        requestHistoryData({
          type,
          MACAddress: '',
          ge: '',
          le: ''
        })
      )
      dispatch(openDialog('eventHistory'))
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
      dispatch(openDialog('trapHistory'))
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
      dispatch(openDialog('syslogHistory'))
      break
    case 'custom':
      dispatch(
        requestHistoryData({
          type,
          sourceIP: '',
          ge: '',
          le: ''
        })
      )
      dispatch(openDialog('customHistory'))
      break
    default:
      break
  }
}

export const initEventDailyData = (payload) => (dispatch) => {
  const { types } = payload
  ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'custom':
        dispatch(updateCustomHistory(data))
        dispatch(updateCustomEventDaily())
        dispatch(clearHistoryData())
        break
      default:
        break
    }
  })

  ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, {
    type: types,
    sourceIP: '',
    ge: '',
    le: ''
  })
}

export const requestHistoryData = (param) => (dispatch) => {
  ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
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
      case 'custom':
        dispatch(updateCustomHistory(data))
        break
      default:
        break
    }
  })

  ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
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
    updateBeepSoundStart: (state) => {
      return { ...state, beepSoundStart: true, openBeepDialog: true }
    },
    updateBeepSoundStop: (state) => {
      return { ...state, beepSoundStart: false, openBeepDialog: false }
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
    updateCustomEvent: (state, action) => {
      const filteredCustomEventData = filterByDate([...state.customEventData])
      const filteredCustomEventDailyData = filterByDate([...state.customEventDailyData])
      let EventList = [...state.customEventListData]
      const { payload } = action
      filteredCustomEventData.push(payload)
      filteredCustomEventDailyData.push(payload)
      EventList.push(payload)
      let sortedEventList = customEventSortFilter([...EventList])
      return {
        ...state,
        customEventData: filteredCustomEventData
      }
    },
    updateEvent: (state, action) => {
      const filteredEventData = filterByDate([...state.eventData])
      const { payload } = action
      filteredEventData.push(payload)
      return { ...state, eventData: filteredEventData }
    },
    updateSyslog: (state, action) => {
      const filteredSyslogData = filterByDate([...state.syslogData])
      const { payload } = action
      filteredSyslogData.push(payload)
      return { ...state, syslogData: filteredSyslogData }
    },
    updateTrap: (state, action) => {
      const filteredTrapData = filterByDate([...state.trapData])
      const { payload } = action
      filteredTrapData.push(payload)
      return { ...state, trapData: filteredTrapData }
    },
    updateCustomDataDaily: (state) => {
      const sortedItems = customEventSortFilter([...state.customEventHistoryData])
      const filteredCustomEventsDailyData = filterByDate([...state.customEventHistoryData])
      return {
        ...state,
        customEventDailyData: filteredCustomEventsDailyData,
        customEventListData: sortedItems.slice(0, 30)
      }
    },
    updateEventHistory: (state, action) => {
      const { payload } = action
      return { ...state, eventHistoryData: payload }
    },
    updateTrapHistory: (state, action) => {
      const { payload } = action
      return { ...state, trapHistoryData: payload }
    },
    updateCustomHistory: (state, action) => {
      const { payload } = action
      return { ...state, customEventHistoryData: payload }
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
    clearCustomEvent: (state) => {
      return { ...state, customEventData: [] }
    },
    clearEventData: (state) => {
      return { ...state, eventData: [] }
    },
    clearTrapData: (state) => {
      return { ...state, trapData: [] }
    },
    clearSyslogData: (state) => {
      return { ...state, syslogData: [] }
    }
  }
})
export const {
  updateTrap,
  updateSyslog,
  updateEvent,
  updateCustomEvent,
  updateEventHistory,
  updateTrapHistory,
  updateSyslogHistory,
  updateCustomHistory,
  clearHistoryData,
  clearEventData,
  clearTrapData,
  clearSyslogData,
  updateLogData,
  updateCustomEventDaily,
  updateBeepSoundStart,
  updateBeepSoundStop
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
*/
