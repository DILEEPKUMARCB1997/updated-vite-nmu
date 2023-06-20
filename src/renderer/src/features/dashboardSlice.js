/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import {
  RESPONSE_RP_GET_EVENT_LOG_HISTORY,
  REQUEST_MP_GET_EVENT_LOG_HISTORY
} from '../../../main/utils/IPCEvents'

const requestGraphData = (Items) => {
  let label = []
  let data = []
  let tableResult = []
  for (let index = 7; index > 0; index--) {
    let le = ''
    let ge = ''
    let ledate = new Date()
    ledate.setDate(ledate.getDate() - (index - 1 - 1))
    let gedate = new Date()
    gedate.setDate(gedate.getDate() - (index - 1))
    le = `${ledate.getFullYear()}-${('00' + (ledate.getMonth() + 1)).slice(-2)}-${(
      '00' + ledate.getDate()
    ).slice(-2)}`
    ge = `${gedate.getFullYear()}-${('00' + (gedate.getMonth() + 1)).slice(-2)}-${(
      '00' + gedate.getDate()
    ).slice(-2)}`
    let result = Items.filter(function (item) {
      return (
        new Date(item.createAt).getTime() >= new Date(ge).getTime() &&
        new Date(item.createAt).getTime() < new Date(le).getTime()
      )
    })
    let gelabel = `${('00' + (gedate.getMonth() + 1)).slice(-2)}/${('00' + gedate.getDate()).slice(
      -2
    )}`
    label.push(gelabel)
    tableResult.push(result)
    data.push(result.length)
  }
  const date = new Date()
  const lastUpdated =
    'last update ' +
    ('00' + date.getDate()).slice(-2) +
    '/' +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('00' + date.getHours()).slice(-2) +
    ':' +
    ('00' + date.getMinutes()).slice(-2)

  // let lastUpdated = syslogGraphData.lastUpdated
  // let tableData = syslogGraphData.tableData
  return { label, data, lastUpdated, tableResult }
}

export const requestHistoryData = (param) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'syslog': {
        const resultSyslog = requestGraphData(data)
        dispatch(updateSyslog(resultSyslog))
        break
      }
    }
  })

  window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
}
export const showSyslogTableData = (payload) => (dispatch) => {
  dispatch(updateSyslogTableData(payload))
  dispatch(openDialog('syslogGraphTable'))
}

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState: {
    diskUses: {},
    trapGraphData: {
      label: [],
      data: [],
      tableData: [],
      lastUpdated: ''
    },
    syslogGraphData: {
      label: [],
      data: [],
      tableData: [],
      lastUpdated: ''
    },
    customGraphData: {
      label: [],
      InformationData: [],
      CriticalData: [],
      WarningData: [],
      tableData: [],
      lastUpdated: ''
    },
    syslogTableData: [],
    trapTableData: [],
    customTableData: []
  },

  reducers: {
    initDiskUses: (state, { payload }) => {
      const { free, size } = payload
      const diskFree = ((free / size) * 100).toFixed(2)
      const diskUsed = (((size - free) / size) * 100).toFixed(2)
      return {
        ...state,
        diskUses: { free, used: size - free, total: size, diskFree, diskUsed }
      }
    },
    updateSyslog: (state, action) => {
      const { payload } = action
      return {
        ...state,
        syslogGraphData: {
          label: payload.label,
          data: payload.data,
          tableData: payload.tableResult,
          lastUpdated: payload.lastUpdated
        }
      }
    },
    updateSyslogTableData: (state, { payload }) => {
      //  const { payload } = action
      return {
        ...state,
        syslogTableData: payload
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
    }
  }
})

export const { initDiskUses, updateSyslog, updateSyslogTableData, openDialog } =
  dashboardSlice.actions

export const dashboardSelector = (state) => {
  const {
    diskUses,
    trapGraphData,
    syslogGraphData,
    customGraphData,
    syslogTableData,
    trapTableData,
    customTableData
  } = state.dashboard

  return {
    diskUses,
    trapGraphData,
    syslogGraphData,
    customGraphData,
    syslogTableData,
    trapTableData,
    customTableData
  }
}

export default dashboardSlice
