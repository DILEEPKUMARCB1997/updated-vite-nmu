/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../main/utils/IPCEvents'
import requestCustomGraphData from '../components/dashboard/requestCustomGraphData'
import requestGraphData from '../components/dashboard/requestGraphData'

export const showCustomTableData = (payload) => (dispatch) => {
  dispatch(updateCustomTableData(payload))
  dispatch(openDialog('customGraphTable'))
}
export const requestHistoryData = (param) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'event':
        break
      case 'trap': {
        const resultTrap = requestGraphData(data)
        dispatch(updateTrapGraph(resultTrap))
        break
      }
      case 'custom': {
        const resultCustom = requestCustomGraphData(data)
        dispatch(updateCustomGraphData(resultCustom))
        break
      }
      default:
        break
    }
  })

  window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
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
    updateTrapGraph: (state, { payload }) => {
      const { label, data, tableResult, lastUpdated } = payload
      return {
        ...state,
        trapGraphData: {
          label: label,
          data: data,
          tableData: tableResult,
          lastUpdated: lastUpdated
        }
      }
    },
    updateCustomGraphData: (state, { payload }) => {
      return {
        ...state,
        customGraphData: {
          label: payload.label,
          InformationData: payload.InformationData,
          CriticalData: payload.CriticalData,
          WarningData: payload.WarningData,
          tableData: payload.tableResult,
          lastUpdated: payload.lastUpdated
        }
      }
    },

    updateCustomTableData: (state, { payload }) => {
      return {
        ...state,
        customTableData: payload
      }
    },

    openDialog: (state) => {
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

export const {
  openDialog,
  initDiskUses,
  updateCustomGraphData,
  updateCustomTableData,
  updateTrapGraph,
  updateTrapTableData
} = dashboardSlice.actions

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
