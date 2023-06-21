import { createSlice } from '@reduxjs/toolkit'

export const requestHistoryData = (param) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'event':
        dispatch(updateEventHistroy(data))
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
  window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
}

const eventLogSlice = createSlice({
  name: 'eventlogslice',
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
    updateEventHistory: (state, { payload }) => {
      return { ...state, eventHistoryData: payload }
    }
  }
})

export const { updateEventHistory } = eventLogSlice.actions

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
